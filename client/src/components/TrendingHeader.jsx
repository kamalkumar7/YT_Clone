import React from 'react'
import styled from "styled-components";

const Txt = styled.div`
color: ${({ theme }) => theme.text};
alignItems:center;
margin-bottom:15px;
font-weight:400;
font-size:30px;
font-family: Arial;
`

const TrendingHeader = () => {
  return (
    <div style={{alignItems:'center', textAlign:'center'}} >

    <Txt>Trending Videos</Txt>
    </div>
  )
}

export default TrendingHeader