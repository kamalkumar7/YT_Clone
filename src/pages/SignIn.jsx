import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [signed,setsigned] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      console.log(name);
      console.log(password);
      const res = await axios.post("http://localhost:800/api/auth/signin", { name: name, password:password },{
        headers:{
          "Conent-Type":"application/json"
        },
        withCredentials:true,
              });
      dispatch(loginSuccess(res.data));
      console.log(res);
      navigate("/YT_Clone/")

    } catch (err) 
    {

      console.log(name);
      console.log(password);
      window.alert("Please signup first");
      dispatch(loginFailure());
      console.log(err)
    
    }
  };

  const signInWithGoogle = async () => 
  {
    
    dispatch(loginStart());

    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          },{
            headers:{
              "Conent-Type":"application/json"
            },
            withCredentials:true,
                  })
          .then((res) => {
            console.log(res)
            dispatch(loginSuccess(res.data));
            navigate("/YT_Clone")
          });
      })
      .catch((error) => {
        dispatch(loginFailure());
      });
  };

  const signupFun = async()=>
  {
    axios.post("https://random-ochre.vercel.app/api/auth/signup",{
      name: name,
      email: email,
      password:password
    },{
      headers:{
        "Conent-Type":"application/json"
      },
      withCredentials:true,
    }).then((res)=>{
      console.log(res);

      if(res.status===200)
      {
        console.log("user signed up")
        setsigned(true);

      }

    }).catch((Error)=>{
      console.log("user exist")
      window.alert("Username / Email already registered")
    })
  }



  return (
    <Container>
      <Wrapper>



      <Title>Sign in</Title>
        <SubTitle>to continue to Youtube </SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
       
        {!signed?<>
          
          <Title>or</Title>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={signupFun}>Sign up</Button>
        </> : <></>}
       

        <Title>or</Title>
          <Button style={{backgroundColor:"blue"}} onClick={signInWithGoogle}>Signin with Google</Button>

        

      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;
