import React from 'react'
import styled from "styled-components";
import BounceLoader from 'react-spinners/BounceLoader';
import LoadingSpinner from './LoadingSpinner';

const NV = styled.div`
color: ${({ theme }) => theme.text};
alignItems:center;
margin-bottom:15px;
font-weight:400;
font-size:30px;
font-family: Arial;
`
const NoVideo = ({home}) => {
  return (
    <NV>
        <div className="message" style={{alignItems:'center', textAlign:'center'}}>
        
        {home?   <LoadingSpinner/>  : <>No Videos Found</> } 
        </div>    
    </NV>
  )
}

export default NoVideo