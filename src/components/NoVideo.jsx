import React from 'react'
import styled from "styled-components";

const NV = styled.div`
color:red;
margin-top:30%;
alignItems:center;
font-size:40px;

font-family: Arial;
`
const NoVideo = () => {
  return (
    <NV>
        <div className="message" style={{alignItems:'center', textAlign:'center'}}>
        No Videos Found    
        </div>    
    </NV>
  )
}

export default NoVideo