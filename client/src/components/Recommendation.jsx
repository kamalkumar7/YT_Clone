import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import _ from 'lodash'
const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`https://random-ochre.vercel.app/api/videos/tags?tags=${tags}`);
      if(_.isEmpty(res.data)) {
        const random  = await axios.get('https://random-ochre.vercel.app/api/videos/random');

        setVideos(random.data);
      }else{

        setVideos(res.data);
      }
   
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
