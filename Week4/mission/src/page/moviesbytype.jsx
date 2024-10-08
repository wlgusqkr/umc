import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { axiosInstance } from "../apis/axios-instance";
import useCustomFetch from "../hooks/useCustomFetch";
const MoviesByType = () => {
  const navigate = useNavigate();
  const params = useParams();
  const url = `/movie/${params.movieType}?language=ko-KR&page=1`
  const { data: movies, isLoading, isError } = useCustomFetch(url);

  if (isLoading == true) {
    return (
      <div>
        <h2>로딩중입니다..</h2>
      </div>
    )
  }

  if (isError == true) {
    return (
      <div>
        <h2> 에러남</h2>
      </div>
    )
  }

  return (
    <>
      <Container>
        {
          movies.data?.results.map((element, index) => {
            return (
              <MovidCard key={index} onClick={() => { navigate(`/movies/detail/${element.id}`) }}>
                <img src={`https://image.tmdb.org/t/p/w200${element.backdrop_path}`} style={{ width: '100%', height: '250px', borderRadius: '20px' }}></img>
                <p style={{ margin: '0', fontWeight: '600', padding: '4px 2px', fontSize: '12px' }}>{element.title}</p>
                <p style={{ margin: '0', fontSize: '12px', padding: '4px 0px' }}>{element.release_date}</p>
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