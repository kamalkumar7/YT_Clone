import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DeleteOutline } from "@mui/icons-material";
import ReactTimeago from "react-timeago";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const ComDiv = styled.div`
display: flex;
justify-content: space-between;
flex:1

`;



const Comment = ({ comment, deletewithId }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComment = async () => {
      // console.log(comment.userId);
      const res = await axios.get(`http://localhost:800/api/users/find/${comment.userId}`);
      setChannel(res.data)
    };
    fetchComment();
  }, [comment.userId]);

  const handleClick = async () => {
    var cookie;
    try {

      cookie = document.cookie.split('{[')[1]
    } catch (err) {
      console.log("cokkies not set");
    }

    // const newarra[] =

    const idd = comment._id;

    await axios.delete(`http://localhost:800/api/comments/${comment._id}`, { data: { cookie } }, {
      headers: {
        "Conent-Type": "application/json"

      },
      withCredentials: true,
    })

    deletewithId(idd);



  }

  return (
    <Container>
      <Avatar src={channel.img} />
      <ComDiv>

        <Details>
          <Name>

            {channel.name} <Date>  {React.createElement(ReactTimeago, { date: comment.createdAt })}</Date>
          </Name>
          <Text>{comment.desc}</Text>

        </Details>
        <DeleteOutline style={{ display: 'flex' }} onClick={handleClick} />
      </ComDiv>
    </Container>
  );
};

export default Comment;
