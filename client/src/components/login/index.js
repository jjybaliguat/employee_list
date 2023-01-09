import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { BtnSubmit, H1, ContactsContainer, Error, FormContainer, 
  FormGroup, FormInput, MainContact, MyForm} from './LoginElements'
import axios from 'axios'
import {Navigate, useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const {register, formState: {errors}, handleSubmit} = useForm()
  const [error, setError] = useState('')
  const [loggedin, setLoggedin] = useState(false)
  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/login', data).then((data) => {
        console.log(data)
        localStorage.setItem("token", data.data.token)
        window.location.href = '/dashboard'
      })
    } catch (error) {
      console.log(error)
    }
  }

  function getLoggedinStat(){
    const token = localStorage.getItem('token')
    if(token){
      setLoggedin(true)
    }else{
      setLoggedin(false)
    }
  }

  useEffect(() => {
    getLoggedinStat()
  }, [])

  return (
    <>
    {loggedin && (<Navigate to='/dashboard' />)}
    <ContactsContainer>
        <H1>Login to Employee List</H1>
        <MainContact>
          <FormContainer>
            <MyForm onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <FormInput
                  placeholder='Enter your email'
                  invalidInput={errors.email? 'true': ''}
                  {...register('email', { 
                    required: "Email field is required",
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  })}
                  />
                  {errors.email && <Error>{errors.email?.message}</Error>}
                  {errors.email?.type === 'pattern' && <Error>Please Enter a valid email address</Error>}
              </FormGroup>
              <FormGroup>
                <FormInput
                  placeholder='password'
                  invalidInput={errors.password? 'true': ''}
                  {...register('password', { 
                    required: true,
                    minLength: 8,
                  })}
                  />
                  {errors.password?.type === 'required' && <Error>Password Field is required</Error>}
                  {errors.password?.type === 'minLength' && <Error>Please Enter atleast 8 length for the password</Error>}
              </FormGroup>
              <BtnSubmit>Send</BtnSubmit>
            </MyForm>
          </FormContainer>
        </MainContact>
    </ContactsContainer>
    </>
  )
}

export default Login