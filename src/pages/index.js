import React from "react"
import { Link, graphql } from "gatsby";
import styled from "styled-components";

import BookItem from "../components/BookItem";

const LinkButton=styled.div`
    text-align:right;
    
    a{
        padding:8px;
        background:rebeccapurple;
        color:white;
        border-radius:8px;
        text-decoration:none;
        
        &:hover{
            background:indigo;
        }
    }
    
    
`


const IndexPage = ({data}) => {

    return (
        <section>
            {data.allBook.edges.map(book=>(
                <BookItem
                    key={book.node.id}
                    title={book.node.title}
                    summary={book.node.summary}
                    author={book.node.author.name}
                    image={book.node.localImage.childImageSharp.fixed}
                >
                <LinkButton>
                    <Link to={`/book/${book.node.id}`}>
                        Join Conversation
                    </Link>
                </LinkButton>
                </BookItem>
                )
            )}
        </section>
    )
}

export const query= graphql`
{
  allBook {
    edges {
      node {
        title
        id
        author {
          name
        }
        summary
        localImage {
         childImageSharp{
            fixed(width:200){
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
}
`

export default IndexPage
