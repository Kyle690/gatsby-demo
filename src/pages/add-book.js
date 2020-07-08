import React,{useContext, useEffect, useState} from "react";
import {FirebaseContext}from '../components/Firebase';
import {Form,Input,Button} from "../common";

import styled from "styled-components";

const FormField = styled.div`
  margin-bottom: 20px;
`

let fileReader;

if(typeof window !=='undefined'){
    fileReader = new FileReader();
}

const AddBook=()=>{
    const {firebase}=useContext(FirebaseContext);

    const [authors,setAuthors]=useState([]);
    const [bookCover, setBookCover]=useState('');
    const [bookName,setBookName]=useState('');
    const [authorId,setAuthorId]=useState('');
    const [summary,setSummary]=useState('');
    const [success,setSuccess]=useState(false);

    let isMounted=true;

    useEffect(()=>{
        fileReader.addEventListener('load',()=>{
            if(isMounted){
                setBookCover(fileReader.result)
            }

        })
    },[])

    useEffect(()=>{
        if(firebase){
            firebase.getAuthors()
                .then((snapshot)=>{
                    const availableAuthors=[];
                    snapshot.forEach(doc=>{
                        availableAuthors.push({
                            id:doc.id,
                            ...doc.data()
                        })
                    });
                    if(isMounted){
                        setAuthorId(availableAuthors[0].id)

                        setAuthors(availableAuthors);
                    }
                })
        }

    },[firebase]);

    useEffect(()=>{
        return ()=>isMounted=false;
    },[])

    function handleSubmit(e){
        e.preventDefault();
        firebase.createBook({
            bookCover,
            bookName,
            authorId,
            summary
        }).then(()=>{
            setSuccess(true);
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormField>
                <Input
                    placeholder={'Book name'}
                    value={bookName}
                    onChange={(e)=>{
                        e.persist();
                        setSuccess(false);
                        setBookName(e.target.value);
                    }}
                />
            </FormField>
            <FormField>
                <Input

                    placeholder={'Book Summary'}
                    value={summary}
                    onChange={e=>{
                        e.persist();
                        setSuccess(false);
                        setSummary(e.target.value);
                    }}
                />
            </FormField>
            <FormField>
                <strong>Book Author</strong>
                <div>
                    <select
                        value={authorId}
                        onChange={(e)=>{
                            e.persist();
                            setSuccess(false);
                            setAuthorId(e.target.value);
                        }}
                    >
                        {authors.map(a=>(
                            <option key={a.id} value={a.id}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </div>

            </FormField>
            <FormField>
                <strong>Book Cover</strong>
                <Input
                    type={'file'}
                    onChange={(e)=>{
                        e.persist();
                        setSuccess(false);
                        fileReader.readAsDataURL(e.target.files[0]);
                    }}
                />
            </FormField>
            {!!success&&
                <span>New Book Added successfully!</span>
            }
            <Button block type={'submit'}>
                Add new Book
            </Button>
        </Form>
    )
}

export default AddBook;