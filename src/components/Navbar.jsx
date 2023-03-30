import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from "react-redux";
import Upload from "./Upload";
// import { async } from "@firebase/util";
import { logout } from "../redux/userSlice";
import {  UploadFileOutlined } from "@mui/icons-material";
import IMG from '../img/userimg.png'

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};

`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const hadnleLogout = async() =>{
    console.log("Logged out");
    dispatch(logout());
  }

  if(currentUser)
  {
    if(!currentUser.img)
    {
      currentUser.img =IMG
    }
  }
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={()=>navigate(`YT_Clone/search?q=${q}`)}/>
          </Search>
          {currentUser ? (
            <User>
              Upload
              <UploadFileOutlined  style={{color:'red' ,cursor: 'pointer'}} onClick={() => {
                  setOpen(true);
              }} /> 
              <Avatar src={currentUser?.img} />
              {currentUser.name}
              <Button onClick={hadnleLogout}> SIGN OUT</Button>
            </User>
          ) : (
            <Link to="YT_Clone/signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN                
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
