import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { instance as axios, responsive } from "./axios";
import NavTop from "./NavTop";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useMediaQuery } from "react-responsive";

const base_url = "https://image.tmdb.org/t/p/original/";
export const TopContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ImgCont = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5rem;
  img {
    object-fit: contain;
    margin: 0 10px;
    transition: transform 250ms ease-in;
    border-radius: 6px;
    min-height: ${({ height }) => (height ? height + "rem" : "11.875rem")};
    min-width: ${({ width }) => (width ? width + "rem" : "10.25rem")};
    @media screen and (max-width: ${responsive.mobile}px) {
      min-height: 4rem;
      min-width: 4rem;
    }
    &:hover {
      transform: scale(1.09);
      transition: transform 250ms ease-in;
    }
  }
`;
const H1 = styled.h1`
  text-transform: capitalize;
  font-size: 1.575rem;
  color: #fff;
  margin-left: 1rem;
  margin-top: 1rem;
`;

export const Row = (props) => {
  const opts = {
    margin: "1rem 0",
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const { title, fetchUrl, height, width } = props;
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  // const [isMobile, setIsMobile] = useState(false);
  // useMediaQuery
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setMovies((prevState) => response?.data?.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);
  const showTrailer = (movieName) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movieName?.name ||
          movieName?.original_title ||
          movieName?.title ||
          movieName?.original_name ||
          ""
      )
        .then((result) => {
          console.log("success ; " + result);
          const urlParams = new URLSearchParams(new URL(result).search);
          setTrailerUrl((prevState) => urlParams.get("v"));
        })
        // movieTrailer(null, { tmdbId: movies.id })
        //   .then((result) => {
        //     console.log("result is " + result);
        //     const urlParams = new URLSearchParams(new URL(result).search);
        //     console.log("urlParams" + urlParams);
        //     setTrailerUrl(prevState=>urlParams.get("v"));
        //   })

        .catch((error) => console.log(error));

      //
    }
  };
  return (
    <TopContainer>
      {/* <NavTop /> */}
      <H1>{title}</H1>
      <RowContainer>
        <ImgCont>
          {movies.map(
            (movie) =>
              !movie?.adult && (
                <img
                  onClick={() => showTrailer(movie)}
                  height={height}
                  width={width}
                  key={movie.id}
                  src={`${base_url}${
                    movie?.poster_path || movie?.backdrop_path
                  }`}
                  alt={movie?.original_title}
                />
              )
          )}
        </ImgCont>
      </RowContainer>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </TopContainer>
  );
};

export default Row;
