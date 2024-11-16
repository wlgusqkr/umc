import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import CardSkeletonList from "../component/Skeleton/card-skeleton-list";
import { useEffect, useRef } from "react";
import useCustomInfiniteQuery from "../hooks/useCustomInfiniteQuery";
const MoviesByType = () => {
  const navigate = useNavigate();
  const params = useParams();
  const url = `/movie/${params.movieType}?language=ko-KR`
  const { data: movies, isLoading, isError, fetchNextPage, hasNextPage, isFetching } = useCustomInfiniteQuery(url, params.movieType);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting && hasNextPage) {
          console.assert(fetchNextPage)
          console.dir(fetchNextPage)
          await fetchNextPage();
        }
      })
    }, { threshold: 0.1 })
    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    }

  }, [movies, fetchNextPage, hasNextPage]);
  console.log(movies)

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
          movies.pages.map((dataPerMovies, Idx) => (
            dataPerMovies.data.results?.map((element, index) => {
              const isLastElement = index === dataPerMovies.data.results?.length - 1; // 항상 최신 배열 기반으로 계산
              return (
                <MovidCard ref={isLastElement ? ref : null} key={index} onClick={() => { navigate(`/movies/detail/${element.id}`) }}>
                  <img src={`https://image.tmdb.org/t/p/w200${element.poster_path}`} style={{ width: '100%', height: '250px', borderRadius: '20px', objectFit: 'cover' }}></img>
                  <p style={{ margin: '0', fontWeight: '600', padding: '4px 2px', fontSize: '12px' }}>{element.title}</p>
                  <p style={{ margin: '0', fontSize: '12px', padding: '4px 0px' }}>{element.release_date}</p>
                </MovidCard>

              )
            })
          ))
        }
        {
          isFetching &&
          <>
            <CardSkeletonList number={20} />
            <SpinnerContainer>
              <div>

              </div>
            </SpinnerContainer>
          </>
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
const spin = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }

`
const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 70px;
    height: 70px;
    border: 7px solid rgba(163, 151, 198, 0.2);
    border-top: 7px solid rgba(163, 151, 198, 1);
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
  }
`