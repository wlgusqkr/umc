import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CardSkeletonList from "../component/Skeleton/card-skeleton-list";
import { useState } from "react";
import useCustomQuery from "../hooks/useCustomQuery";
const MoviesByType = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const url = `/movie/${params.movieType}?language=ko-KR&page=${currentPage}`
  const { data: movies, isLoading, isError } = useCustomQuery(url, params.movieType + currentPage);

  if (isLoading === true) {
    return (
      <Container>
        <CardSkeletonList number={20} />
      </Container>
    )
  }

  if (isError === true) {
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
          movies.data.results?.map((element, index) => {
            return (
              <MovidCard key={index} onClick={() => { navigate(`/movies/detail/${element.id}`) }}>
                <img src={`https://image.tmdb.org/t/p/w200${element.poster_path}`} style={{ width: '100%', height: '250px', borderRadius: '20px', objectFit: 'cover' }}></img>
                <p style={{ margin: '0', fontWeight: '600', padding: '4px 2px', fontSize: '12px' }}>{element.title}</p>
                <p style={{ margin: '0', fontSize: '12px', padding: '4px 0px' }}>{element.release_date}</p>
              </MovidCard>

            )
          })
        }
        <ButtonContainer>
          {
            currentPage === 1 ?
              <button onClick={() => { setCurrentPage(prev => prev - 1) }} disabled style={{backgroundColor:'gray'}}>이전</button>
              :
              <button onClick={() => { setCurrentPage(prev => prev - 1) }}>이전</button>
          }
          <span> {currentPage} 페이지</span>
          <button onClick={() => { setCurrentPage(prev => prev + 1) }}>다음</button>
        </ButtonContainer>
      </Container>
    </>
  )
}

export default MoviesByType;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
`
const MovidCard = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
`


const ButtonContainer = styled.div`
  width: 100%; 
  gap: 10px; 
  display:flex; 
  justify-content : center; 
  align-items : center; 
  margin : 15px ;
  button {
    color: black; 
    width: 55px; 
    height: 35px; 
    border-radius: 7px; 
    background-color: lightpink;
  }
`