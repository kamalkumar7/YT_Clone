import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import NoVideo from "../components/NoVideo";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`https://random-ochre.vercel.app/api/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  if(videos.length===0)
  {
    return(
      <NoVideo/>
    )

  }
  return ( <Container>
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
  </Container>
  )
  
  ;
};

export default Search;
