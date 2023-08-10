import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import { useNavigate } from "react-router-dom";
import {

  WhatsappShareButton,WhatsappIcon 
  
} from "react-share";


import ReactTimeago from "react-timeago";
import { DeleteOutline } from "@mui/icons-material";
import IMG from '../img/userimg3.svg'

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div`
border-radius:15px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  const [subNum,setSubNum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`https://random-ochre.vercel.app/api/videos/find/${path}`);

        const channelRes = await axios.get(`https://random-ochre.vercel.app/api/users/find/${videoRes?.data.userId}`);

          // console.log(channelRes);
        setChannel(channelRes.data);


        setTimeout(()=>{
           axios.put(`https://random-ochre.vercel.app/api/videos/view/${currentVideo?._id}`);

        },0)
     
        
        dispatch(fetchSuccess(videoRes.data));

      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch, currentVideo?._id]);



  const handleLike = async () => {
    
    if(currentUser)
    {
      var coookie;
      try{
         coookie = document.cookie.split('{[')[1]
      }catch(err)
      {
        console.log("cokkies not set");
      }
      await axios.put(`https://random-ochre.vercel.app/api/users/like/${currentVideo?._id}`,{cookie:coookie}).then(()=>{
  
        dispatch(like(currentUser?._id));
      })

    }else
    {
      window.alert("Please Signin to Like/Dislike")
    }

  };
  const handleDislike = async () => {
    
    if(currentUser)
    {
      var coookie;
      try{
         coookie = document.cookie.split('{[')[1]
      }catch(err)
      {
        console.log("cokkies not set");
      }
      await axios.put(`https://random-ochre.vercel.app/api/users/dislike/${currentVideo?._id}`,{cookie:coookie}).then(()=>{
  
        dispatch(dislike(currentUser?._id));
      })

    }else
    {
      window.alert("Please Signin to Like/Dislike")
    }


  };

  

  const handleSub = async () => {
    
    if(currentUser)
    {
      var coookie;
      try{
         coookie = document.cookie.split('{[')[1]
      }catch(err)
      {
        console.log("cokkies not set");
      }
      
        // console.log(channel.id);
      
      currentUser.subscribedUsers.includes(channel?._id)
        ?
          await axios.put(`https://random-ochre.vercel.app/api/users/unsub/${channel?._id}`,{cookie:coookie}).then(setSubNum(subNum-1))
         
        
        : 
       
          await axios.put(`https://random-ochre.vercel.app/api/users/sub/${channel?._id}`, {cookie:coookie}).then(setSubNum(subNum+1))     
  
       dispatch(subscription(channel?._id));
    }else{
      window.alert("Please Signin to Subscribe")
    }


  };


  const deleteVideo = async()=>{
    var coookie;
    try{
       coookie = document.cookie.split('{[')[1]
    }catch(err)
    {
      console.log("cokkies not set");
    }
    if (window.confirm("You want to delete this video"))
{ 
  await axios.delete(`https://random-ochre.vercel.app/api/videos/${currentVideo?._id}`, { data: { cookie:coookie } }).then(()=>{
    navigate("/")
  })
}
  }

  if(channel?.img ===undefined)
  {
    channel.img = IMG;
  }

  return (
    currentVideo
    ?
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {React.createElement(ReactTimeago, {date: currentVideo?.createdAt})}
          </Info>
 
          <Buttons>
                <WhatsappShareButton
        url={`https://kamalkumar7.github.io/video/${currentVideo?._id}`}
        quote={'Dummy text!'}
        hashtag="#muo"
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            

              
            <Button onClick={deleteVideo}>
              {currentVideo?.userId === currentUser?._id && <DeleteOutline/>}
            </Button>
          </Buttons>
          
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{subNum} subscribers</ChannelCounter>
              <Description>{currentVideo.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {currentUser?.subscribedUsers?.includes(channel?._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
    :null
  );
};

export default Video;
