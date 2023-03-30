import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import TrendingHeader from "../components/TrendingHeader";
import SigninMessage from "../components/SigninMessage";
import { useSelector } from "react-redux";
import NoVideoSub from "../components/NoVideoSub";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
  const [videos, setVideos] = useState([]);
  const [authMessage, setauthMessage] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchVideos = async () => {
      if(type===undefined)
      {
        type = 'random'
      }

      
     

          if(type === 'sub')
          {
            try 
            {
              var coookie;
              if(currentUser) {
                try{
                
                  coookie = document.cookie.split('{[')[1]
               }catch(err)
               {
                 console.log("cokkies not set");
               }
              }
              


       
              if(coookie)
              {

                const res = await axios.post(`https://random-ochre.vercel.app/api/videos/${type}`, 
                {
                  cookie:coookie
                });
  
                setVideos(res.data);
              }else{
                setauthMessage(true)
              }
         


            }  catch (error) 
            {
              setauthMessage(true);
              setVideos([])
              // console.log(error);
              
            }
        
          }else
          {
            try 
            {
              const res = await axios.get(`https://random-ochre.vercel.app/api/videos/${type}`);

              setVideos(res.data);
            }          catch (error) {
              console.log(error);
              
            }
          }
    

          


      
    };
    fetchVideos();
  }, [type,authMessage]);


  return (
    <>
      {type === 'trend'?<TrendingHeader/>:null}
      {authMessage && type==='sub'?<SigninMessage/>:null}
      {videos.length===0 && authMessage===false && type==='sub' ? <NoVideoSub/>:null}

    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video}/>
        ))}
    </Container>
    </>
  );
};

export default Home;
