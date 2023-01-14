import React from 'react'
import { Box, TextField, Button, styled, Typography } from '@mui/material'
import { useState, useContext } from 'react'
import { API } from '../../service/api'
import { DataContext } from '../../context/DataProvider'
import { useNavigate } from 'react-router-dom'

// CSS PROPERTIES

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    @media (max-width: 470px) {
        width: 325px;
    }
`

const ImageStyle = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
    background: #FB641B;
    height: 40px;
`

const SignupButton = styled(Button)`
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
    height: 40px;
`

const Text = styled(Typography)`
    color: #878787;
    font-size: 13px
`

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}

const loginInitialValues = {
    username: '',
    password: ''
}

const Login = ({ isUserAuthenticated }) => {

    const imgURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png'

    const [account, toggleAccount] = useState('login')
    const [signup, setSignup] = useState(signupInitialValues)
    const [login, setLogin] = useState(loginInitialValues)
    const [error, setError] = useState('')

    const { setAccount } = useContext(DataContext)
    const navigate = useNavigate()

    const toggleSignup = () => {
        toggleAccount('signup')
    }

    const toggleLogin = () => {
        toggleAccount('login')
    }
    
    const onValueChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const onInputChange = (e) => {
        setSignup({...signup, [e.target.name]: e.target.value})
    }

    const loginUser = async () => {
        let response = await API.userLogin(login)
        if(response.isSuccess) {
            setError('')
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`)
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`)

            setAccount({username: response.data.username, name: response.data.name})
            isUserAuthenticated(true)
            navigate('/')
        }
        else {
            setError('Something went wrong. Please try again later')
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup)
        if(response.isSuccess) {
            setError('')
            setSignup(signupInitialValues)
            toggleAccount('login')
        }
        else {
            setError('Something went wrong. Please try again later')
        }
    }

    return (
        <>
            <Component>
                <Box>
                    <ImageStyle src={imgURL} alt="Login Page" />
                </Box>
                {
                    account === 'login' ? 
                        <Wrapper>
                            <TextField variant='standard' onClick={(e) => onValueChange(e)} name='username' label='Enter Username'/>
                            <TextField variant='standard' onClick={(e) => onValueChange(e)} name='password' label='Enter Password'/>
                            <LoginButton variant='contained' onClick={() => loginUser()}>Login</LoginButton>
                            <Text style={{textAlign: 'center'}}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()}>Create an Account</SignupButton>
                        </Wrapper>
                    :
                        <Wrapper>
                            <TextField variant='standard' label='Enter Name' onChange={(e) => onInputChange(e)} name='name' />
                            <TextField variant='standard' label='Enter Username' onChange={(e) => onInputChange(e)} name='username' />
                            <TextField variant='standard' label='Enter Password' onChange={(e) => onInputChange(e)} name='password' />
                            {error && <Error>{error}</Error>}
                            <LoginButton variant='contained' onClick={() => signupUser()} >Signup</LoginButton>
                            <Text style={{textAlign: 'center'}}>OR</Text>
                            <SignupButton onClick={() => toggleLogin()}>Already have an Account</SignupButton>
                        </Wrapper>
                }
            </Component>
        </>
    )
}

export default Login