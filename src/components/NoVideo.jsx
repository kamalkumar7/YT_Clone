import React from 'react'
import styled from "styled-components";

const NV = styled.div`
color: ${({ theme }) => theme.text};
alignItems:center;
margin-bottom:15px;
font-weight:400;
font-size:30px;
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