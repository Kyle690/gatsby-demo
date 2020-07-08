import React, {useContext} from "react";

// components
import BookItem from "../components/BookItem";
import {graphql} from "gatsby";
import {BookComments} from "../common";
import {FirebaseContext}from '../components/Firebase';

const BookTemplate=(props)=>{
    const {firebase}=useContext(FirebaseContext);


    const {title,summary,author,localImage,id}=props.data.book;

    return (
        <section>
            <BookItem
                image={localImage.childImageSharp.fixed}
                title={title}
                summary={summary}
                author={author.name}
                />
            {!! firebase&&
                <BookComments
                    bookId={id}
                    firebase={firebase}
                />
            }
        </section>
    )
}

export const query=graphql`
query BookQuery ($bookId:String!){
    book(id:{eq:$bookId}){
        title
        summary
        id
        author{name}
        localImage {
         childImageSharp{
            fixed(width:200){
              ...GatsbyImageSharpFixed
            }
          }
        }
    }
}
`

export default BookTemplate;