import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({videoId}) => {

  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://random-ochre.vercel.app/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId, comments.length]);

  const deletewithId=(idd) =>{
    const tmp = comments.filter((comm)=>{return comm._id!==idd});
    setComments(tmp);
  }

  const addComment  = async(e)=>{

    e.preventDefault()
  var cookie;
  try{

     cookie = document.cookie.split('{[')[1]
  }catch(err)
  {
    console.log("cokkies not set");
  }
  const res = await axios.post(`https://random-ochre.vercel.app/api/comments`,
  {
    videoId:videoId,
    desc: comment,
    cookie:cookie
  })

  setComments((prev) => [...prev,res.data]);
  setComment('');


  }
  const handleChange = (e)=>{
    setComment(e.target.value);
    // console.log(comment);
  }

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img} />
        <Input placeholder="Add a comment..."  onChange={handleChange}/>
        {currentUser?<button style={{background:'#cc1a00', color:"white" , padding:'10px'} } onClick={addComment}> Submit</button>:null}
        
      </NewComment>
      {comments.map(comment=>(
        <Comment key={comment._id} comment={comment}   deletewithId = {deletewithId}/>
      ))}
    </Container>
  );
  
};

export default Comments;
