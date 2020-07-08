import React, {useState, useContext} from "react";
import {FirebaseContext}from '../components/Firebase';
import {Form, Input, Button, ErrorMessage} from "../common/";


const Registration=()=>{

    const {firebase}=useContext(FirebaseContext)
    const [formValues,setFormValues]=useState({email:'',password:'',confirmPassword:'', username:''});
    const [error,setError]=useState('');


    const handleInputChange=(e)=>{
        e.persist();
        setError('');
        setFormValues(currentValues=>({
            ...currentValues,
            [e.target.name]:e.target.value
        }))
    }



    const handleSubmit=(e)=>{
        e.preventDefault();
        if(formValues.password===formValues.confirmPassword){
            firebase.register({
                email:formValues.email,
                password:formValues.password,
                username:formValues.username
            }).catch(err=>setError(err.message))
        }else{
            setError('Error: Passwords do not match!')
        }
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Input
                placeholder={'name'}
                type={'text'}
                name={'username'}
                required
                value={formValues.username}
                onChange={handleInputChange}
            />
            <Input
                placeholder={'youremail@mail.com'}
                type={'email'}
                required
                name={'email'}
                value={formValues.email}
                onChange={handleInputChange}
            />
            <Input
                placeholder={'password'}
                type={'password'}
                required
                minLength={6}
                name={'password'}
                value={formValues.password}
                onChange={handleInputChange}
            />
            <Input
                placeholder={'confirmPassword'}
                type={'password'}
                required
                minLength={6}
                name={'confirmPassword'}
                value={formValues.confirmPassword}
                onChange={handleInputChange}
            />
            {!!error&&
                <ErrorMessage>{error}</ErrorMessage>
            }
            <Button block type={'submit'}>
                Register
            </Button>
        </Form>
    )
}

export default Registration;