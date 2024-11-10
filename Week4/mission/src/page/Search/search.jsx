import { useEffect, useState } from 'react';
import * as S from './search.style'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MovieList from './movieList';
const Search = () => {
  const [searchValue, setSearchValue] = useState();
  const [debouncedValue, setDebouncecdValue] = useState();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({
    mq: ''
  })

  const mq = searchParams.get('mq')

  const handleSearchMovie = () => {
    if (mq == searchValue) return;
    navigate(`/search?mq=${searchValue}`)
  }

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncecdValue(searchValue)
    }, 500)

    return ()=>{
      clearTimeout(timer)
    }
  }, [searchValue])

  useEffect(()=>{
    handleSearchMovie();
  }, [debouncedValue])
  
  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearchMoveWithKeyboard = (e) => {
    if (e.key === 'Enter') {
      handleSearchMovie();
    }
  }

  return (
    <>
      <S.SearchContainer>
        <input placeholder='영화 제목을 입력해주세요... ' value={searchValue} onChange={onChangeSearchValue}
          onKeyDown={handleSearchMoveWithKeyboard}></input>
        <button onClick={handleSearchMovie} >찾기</button>
      </S.SearchContainer>
      <MovieList></MovieList>

    </>
  )
}

export default Search;
