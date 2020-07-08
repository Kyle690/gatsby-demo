import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React,{useContext} from "react"
import {FirebaseContext}from './Firebase';
import styled from "styled-components";

const LogoutLink=styled.span`
    margin-left:5px;
    margin-right:10px;
    cursor:pointer;
    color:white;
    &:hover{
        text-decoration:underline;
       
    }
`
const Divider = styled.span`
  margin: 0 8px;
  padding-right: 1px;
  background: #ddd;

`

const AdminLink = styled.span`
  a{
      margin-left: 5px;
      color:white;
      text-decoration: none;
      &:hover{
        text-decoration:underline;
      }
  }

`


const Header = ({ siteTitle }) => {
    const {firebase,user}=useContext(FirebaseContext);
    //console.log(user);
    function handleLogout(){
        firebase.logout().then(()=>navigate('/login'))
    }

    return (
      <header
        style={{
          background: `rebeccapurple`,
          marginBottom: `1.2rem`,
          display:'flex'
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `1.45rem 1.0875rem`,
            flexGrow:1
          }}
        >
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {siteTitle}
            </Link>
          </h1>
        </div>
          <div style={{margin:'auto'}}>
              {!!user&&user.email&&
              <div style={{textAlign:'right', color:'white'}}>
                  Hello, {user.username?user.username:user.email}
                      {!!user.isAdmin&&
                        <>
                            <AdminLink>
                                <Link to={'/add-author'}>Add Author</Link>
                            </AdminLink>
                            <Divider/>
                            <AdminLink>
                                <Link to={'/add-book'}>Add Book</Link>
                            </AdminLink>
                        </>
                      }
                  <Divider/>
                  <LogoutLink onClick={handleLogout}>
                      Logout
                  </LogoutLink>
              </div>

              }
              {(!user || !user.email) &&
              <div style={{marginRight:'10px'}}>
                  <Link style={{color:'white'}} to={'/login'}>Login</Link>
                  <Divider/>
                  <Link  style={{color:'white'}} to={'/registration'}>Register</Link>
              </div>
              }
          </div>
      </header>
    )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
