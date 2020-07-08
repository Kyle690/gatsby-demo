import React,{useEffect,useState} from "react";
import styled from "styled-components";
import moment from 'moment';
import {Button} from "./Buttons";
import {Input} from "./Input";

const CommentForm = styled.form`
  display: flex;
  margin-top: 32px;
  
  ${Input}{
    margin-right: 8px;
    margin-top: auto;
    margin-bottom: auto;
  }
  
  ${Button}{
    margin-top: auto;
    margin-bottom: auto;
  }
  
`

const CommentListItem=styled.div`
  >strong {
    font-size: 80%;
    color:#666;
   
  }

  border-bottom: 1px solid #ddd;
  padding:4px 0;
`



export const BookComments =({firebase,bookId})=>{

    const [comments,setComments]=useState([]);
    const [commentText,setCommentText]=useState('');

    useEffect(()=>{
        const unsubscribe =firebase.subscribeToBookComments({
            bookId,
            callback:(snapShot)=>{
                const snapShotComments=[];
                // using the foreach supplied by firebase
                snapShot.forEach(doc=>{
                    snapShotComments.push({
                        id:doc.id,
                        ...doc.data()
                    });
                });
                setComments(snapShotComments);
            }
        });

        return ()=>{
           if(unsubscribe){
               unsubscribe();
           }
        }

    },[])

   function handlePostCommentSubmit(e){
        e.preventDefault();

        firebase.postComment({
            text:commentText,
            bookId
        }).then(()=>setCommentText(''))

    }


    return (
        <div>
            <CommentForm onSubmit={handlePostCommentSubmit}>
                <Input
                    value={commentText}
                    onChange={e=>{
                        e.persist();
                        //e.persist holds the value while react takes the value and updates it to state
                        setCommentText(e.target.value);
                    }}
                />
                <Button type={'submit'}>Post Comment</Button>
            </CommentForm>
            {comments.map(comment=>(
                <CommentListItem key={comment.id}>
                    <strong>{comment.username}- {moment(comment.dateCreated.toDate()).format('hh:mm Do MMM YYYY')}</strong>
                    <div>
                        {comment.text}
                    </div>
                </CommentListItem>
            ))}
        </div>
    )
};
