import React from "react";
import "./App.css";
import Row from "./Row";
import { request } from "./axios";
import Header from "./Header";

function App() {
  const {
    fetchActionMovies,
    fetchComedyMovies,
    fetchDocumentaries,
    fetchHorrorMovies,
    fetchNetflixOriginals,
    fetchRomanceMovies,
    fetchTopRated,
    fetchTrending,
  } = request;

  return (
    <section className="App">
      <div>
        <Header />
      </div>
      <Row title={"NETFLIX ORIGINALS"} fetchUrl={fetchNetflixOriginals} />
      <Row title={"Trending Now"} fetchUrl={fetchTrending} />
      <Row title={"Top Rated"} fetchUrl={fetchTopRated} />
      <Row title={"Action movies"} fetchUrl={fetchActionMovies} />
      <Row title={"comedy movies"} fetchUrl={fetchComedyMovies} />
      <Row title={"horror movies"} fetchUrl={fetchHorrorMovies} />
      <Row title={"romance movies"} fetchUrl={fetchRomanceMovies} />
      <Row title={"documentaries"} fetchUrl={fetchDocumentaries} />
    </section>
  );
}

export default App;
