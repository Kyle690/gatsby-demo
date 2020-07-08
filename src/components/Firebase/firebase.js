import firebaseConfig from "./config";
import axios from 'axios';

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);


      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();


    }
   // process.env!=='production'?? firebase.functions().useFunctionsEmulator('http://localhost:5000')
    //this.functions.useFunctionsEmulator('http://localhost:5000')
  }


  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async register({email,password, username}){
    await this.auth.createUserWithEmailAndPassword(email,password);
    const createProfileCallable = this.functions.httpsCallable('createPublicProfile');
    return createProfileCallable({
      username
    })

  }

   getUserProfile({uid,callback}){
    return this.db
         .collection('publicProfiles')
         .where('userId','==',uid)
          .limit(1)
         .onSnapshot(callback);
  }

  subscribeToBookComments({bookId,callback}){
    const bookRef = this.db.collection('books').doc(bookId)
    return this.db
        .collection('comments')
        .where('book','==',bookRef)
        .orderBy('dateCreated','desc')
        .onSnapshot(callback);
  }

  async postComment({text,bookId}){
    // refers to the functions created in the cloud functions
    const postCommentCallable = this.functions.httpsCallable('postComment');
    return postCommentCallable({text,bookId})
  }

  async createAuthor({authorName}){
    const createAuthorCallable = this.functions.httpsCallable('createAuthor');
    return createAuthorCallable({
      authorName
    })
  }

  async getAuthors(){
    return this.db.collection('authors').get();
  }

  async createBook({bookName,authorId,bookCover, summary}){
    const createBookCallable = this.functions.httpsCallable('createBook');
    return createBookCallable({
      bookName,
      authorId,
      bookCover,
      summary
    })
  }

}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
