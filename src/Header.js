import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { instance as axios, request } from "./axios";
import "./App.css";
import { responsive } from "./axios";
import { useMediaQuery } from "react-responsive";
import NavTop from "./NavTop";

const base_url = "https://image.tmdb.org/t/p/original/";
export const TopHeader = styled.div`
  height: 550px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  object-fit: contain;
  margin-bottom: 2rem;
  position: relative;
`;
const InnerTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 97%;
  margin-left: auto;
  .title {
    font-size: 3rem;
  }
`;
const OverView = styled.p`
  @media screen and (max-width: ${responsive.mobile}px) {
    max-width: 55%;
  }
`;
const Gradient = styled.div`
  background-image: linear-gradient(
    180deg,
    transparent,
    rgba(37, 37, 37, 0.61),
    #111
  );
  height: 7.4rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Header = (props) => {
  const isMobile = useMediaQuery({ maxWidth: responsive.mobile });
  const truncate = (str, n) => {
    return str?.length > n ? str?.substr(0, n - 1) + " . . ." : str;
  };
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchHeader() {
      const response = await axios.get(request.fetchTrending);
      const prevState = response?.data?.results;
      setMovies(
        (newState) =>
          prevState[Math.floor(Math.random() * prevState.length - 1)]
      );
      return response;
    }
    fetchHeader();
  }, []);
  console.log(movies);
  const headerStyle = {
    background: `url(${base_url}${
      movies?.backdrop_path || movies?.poster_path
    }) no-repeat center/cover`,
  };

  return (
    <TopHeader style={headerStyle}>
      <NavTop />
      <InnerTop>
        <h1 className="title">{movies?.title || movies?.original_name}</h1>
        <div className="button-wrapper">
          <button>play</button>
          <button>play lists</button>
        </div>
        <OverView className="overview">
          {truncate(movies?.overview, isMobile ? 100 : 500)}
        </OverView>
      </InnerTop>
      <Gradient />
    </TopHeader>
  );
};

export default Header;
