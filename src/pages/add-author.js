import React, {useState, useContext, useEffect} from "react";
import {Form,Input,Button} from "../common";
import {FirebaseContext}from '../components/Firebase';

const AddAuthor=()=>{

    const {firebase}=useContext(FirebaseContext);

    const [authorName,setAuthorName]=useState('');
    const [success,setSuccess]=useState(false);
    let isMounted=true;
    function handleSubmit(e){
        e.preventDefault();

        firebase.createAuthor({authorName})
            .then(()=>{
                if(isMounted){
                    setAuthorName('');
                    setSuccess(true);
                }
            })
    }

    useEffect(()=>{
        return ()=>isMounted=false;
    },[isMounted])
    return (
        <Form onSubmit={handleSubmit}>
            <Input
                value={authorName}
                placeholder={'author name'}
                onChange={(e)=>{
                    e.persist()
                    setSuccess(false);
                    setAuthorName(e.target.value)
                }}
            />
            {!!success &&
                <span>
                    Author created successfully!
                </span>
            }
            <Button block>
                Add New Author
            </Button>
        </Form>
    )
}
export  default AddAuthor;