import React,{useState, useContext, useEffect} from "react";
import {navigate}from 'gatsby';
import {FirebaseContext} from "../components/Firebase";
import {Form, Input, Button, ErrorMessage} from "../common";


const LoginPage= () => {

    const [formValues,setFormValues]=useState({email:'',password:''});
    const {firebase}=useContext(FirebaseContext);
    const [error,setError]=useState('');
    let isMounted =true;

    function handleSubmit(e) {
        e.preventDefault();
         firebase.login(formValues).then(()=>{
            return navigate('/');
         }).catch(err=>{
             if(isMounted){
                 setError(err.message);
             }

         })
    }
    function handleInputChange(e){
        e.persist()
        setError('');
        setFormValues(currentValues=>({
            ...currentValues,
            [e.target.name]:e.target.value
        }))
    }

    useEffect(()=>{
       return ()=>isMounted=false;
    },[])

    return (
        <section>
            <Form onSubmit={handleSubmit}>
                <Input
                    required
                    name={'email'}
                    placeholder={'Email'}
                    type={'email'}
                    value={formValues.email}
                    onChange={handleInputChange}
                />
                <Input
                    required
                    name={'password'}
                    placeholder={'Password'}
                    type={'password'}
                    value={formValues.password}
                    onChange={handleInputChange}
                />
                {!!error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                <Button block type={'submit'}>Login</Button>
            </Form>
        </section>
    )
}

export default LoginPage