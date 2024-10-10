import { useState, useEffect } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
import styled from "styled-components";
const MoviesByType = () => {
  const [movies, setMovies] = useState();
  const params = useParams();
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}?language=ko-KR&page=1`

  useEffect(() => {
    const getMovies = async () => {
      const movies = await axios.get(url, {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDRiYjJjZDdhNGRjMzIwZWU0MGMwM2JlYThjMzI1ZCIsIm5iZiI6MTcyODQ0NTM5NS4yODU4MjksInN1YiI6IjY3MDVmYWI0YTg4NjE0ZDZiMDhhYzdlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KEu-49dVDHgO26jIGFyH-CHlXI3VDNq9juq6l-0VXVY'
        }
      })
      setMovies(movies.data.results);
    }
    getMovies();
  }, [])

  return (
    <>
      <Container>
        {
          movies?.map((element, index) => {
            return (
              <MovidCard key={index}>
                <img src={`https://image.tmdb.org/t/p/w400${element.backdrop_path}`} style={{ width: '100%', height: '250px', borderRadius: '20px'}}></img>
                <p style={{ margin: '0', fontWeight: '600', padding: '4px 2px', fontSize: '12px'}}>{element.title}</p>
                <p style={{ margin: '0', fontSize: '12px', padding: '4px 0px'}}>{element.release_date}</p>
              </MovidCard>
            )
          })
        }
      </Container>
    </>
  )
}

export default MoviesByType;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-contents: space-evenly;
    gap: 20px;
`
const MovidCard = styled.div`
    width: 15%;
    display: flex;
    flex-direction: column;
`