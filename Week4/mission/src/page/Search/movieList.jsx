import * as S from './search.style'
import useCustomFetch from '../../hooks/useCustomFetch'
import { useSearchParams } from 'react-router-dom'
import CardSkeleton from '../../component/Skeleton/card-skeleton.jsx'
import CardSkeletonList from '../../component/Skeleton/card-skeleton-list.jsx'

const MovieList = () => {

    const [searchParams, setSearchParams] = useSearchParams({
        mq: ''
    })

    const mq = searchParams.get('mq')
    const url = `/search/movie?query=${mq}&include_adult=false&language=en-US&page=1`;
    const { data: movies, isLoading, isError } = useCustomFetch(url);

    if (isLoading) {
        return (
            <S.Container>
                <CardSkeletonList number={50} />
            </S.Container>
        )
    }
    if (mq && movies.data?.results.length === 0) {
        return (
            <div>
                <h1>{mq}검색결과가 없습니다.</h1>
            </div>
        )
    }
    return (
        <S.Container>
            {
                movies.data?.results.map((element, index) => {
                    return (
                        <S.MovidCard key={index} onClick={() => { navigate(`/movies/detail/${element.id}`) }}>
                            <img src={`https://image.tmdb.org/t/p/w200${element.poster_path}`} style={{ width: '100%', height: '250px', borderRadius: '20px', objectFit: 'cover' }}></img>
                            <p style={{ margin: '0', fontWeight: '600', padding: '4px 2px', fontSize: '12px' }}>{element.title}</p>
                            <p style={{ margin: '0', fontSize: '12px', padding: '4px 0px' }}>{element.release_date}</p>
                        </S.MovidCard>
                    )
                })
            }
        </S.Container>
    )
}

export default MovieList;