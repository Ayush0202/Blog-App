import React from 'react'
import { AppBar, Toolbar, styled } from '@mui/material'
import { Link } from 'react-router-dom'

const Component = styled(AppBar)`
    background: #FFF;
    color: #000;
`

const Container = styled(Toolbar)`
    justify-content: center;
    & > a {
        padding: 15px;
        /* Mobile Responsive */
        @media (max-width: 470px) { 
            padding: 10px
        }

        color: #000;
        text-decoration: none;
    }
`
 
const Header = () => {
  return (
    <Component>
        <Container>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/login'>Logout</Link>
        </Container>
    </Component>
  )
}

export default Header