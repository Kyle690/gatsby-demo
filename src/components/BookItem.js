import React from 'react';
import styled from "styled-components";
import Img from 'gatsby-image'
const BookItemWrapper=styled.section`
  border:1px solid #ddd;
  padding:8px;
  background:white; 
  margin-bottom:8px;
  display:flex;
  
  
  
`;

const BookItemImageWrapper=styled.div`
    max-width:200px;
    
    img{
        max-width:200px;
    }
`

const BookItemContentWrapper=styled.div`
    flex-grow:1;
    margin-left:18px;
    h2{
    small{
        font-size:14px;
        padding-left:8px;
        font-weight:normal;
    }
  } 
`;

const BookItem=({title,summary,author, children, image})=>{
    return (
        <BookItemWrapper>
            <BookItemImageWrapper>
                <Img fixed={image}/>
            </BookItemImageWrapper>
            <BookItemContentWrapper>
                <h2>{title} - <small>{author}</small></h2>
                <p>{summary}</p>
                <div>{children}</div>
            </BookItemContentWrapper>
        </BookItemWrapper>
    )
}
export default BookItem;