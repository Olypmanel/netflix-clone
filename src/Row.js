import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { instance as axios, responsive } from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

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
    min-height: 11.875rem;
    min-width: 10.25rem;
    @media screen and (max-width: ${responsive.mobile}px) {
      min-height: 5rem;
      min-width: 5rem;
      margin: 0 5px;
      border-radius: 4px;
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
  margin: 1.5rem 0 0.5rem 1rem;
`;

export const Row = ({ title, fetchUrl }) => {
  const opts = {
    margin: "1rem 0",
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
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
