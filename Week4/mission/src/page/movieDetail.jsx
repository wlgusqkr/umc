import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import styled from "styled-components";

const MovieDetail = () => {
  const params = useParams();
  const creditUrl = `/movie/${params.movieId}/credits?language=ko-KR&page=1`;
  const detailUrl = `/movie/${params.movieId}?language=ko-KR`;

  const { data: creditData, isLoading: isCreditLoading, isError: isCreditError } = useCustomFetch(creditUrl);
  const { data: detailData, isLoading: isDetailLoading, isError: isDetailError } = useCustomFetch(detailUrl);
  
  if(isCreditLoading == true && isDetailLoading == true) {
    return (
      <div>
        <h2>로딩중입니다.</h2>
      </div>
    )
  }

  if(isDetailError == true && isCreditError == true) {
    return (
      <div>
        <h2>에러났습니다.</h2>
      </div>
    )
  }
  return (
    <Container>
      <Wrapper>
        <Image src={`https://image.tmdb.org/t/p/w500/${detailData.data?.backdrop_path}`} alt=""></Image>
        <Label>
          <Text fontsizecus="24px">{detailData.data?.title}</Text>
          <Text>평균 {detailData.data?.vote_average}</Text>
          <Text>{detailData.data?.release_date}</Text>
          <Text>{detailData.data?.runtime}분</Text>
          <Text fontSizecus="20px">{detailData.data?.tagline}</Text>
          <Text>{detailData.data?.overview}</Text>
        </Label>
      </Wrapper>

      <div>
        <h2>감독/출연</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px'}}>
          {creditData.data?.cast.map((element, index) => {
            return (
              <div style={{ textAlign: "center" }}>
              <Image src={`https://image.tmdb.org/t/p/w500/${element.profile_path}`} style={{  width: '150px', height: '150px', borderRadius: '80px', border: '2px solid white' }}></Image>
              <Text>{element.name}</Text>
              <Text>{element.original_name}</Text>
            </div>
            )

          })}
          <div style={{ width: '150px', height: '150px', textAlign: "center" }}>
            <Image src={`https://image.tmdb.org/t/p/w500/${creditData.data?.cast[0].profile_path}`} style={{ borderRadius: '80px', border: '2px solid white' }}></Image>
            <Text>{creditData.data?.cast[0].name}</Text>
            <Text>{creditData.data?.cast[0].original_name}</Text>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default MovieDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Wrapper = styled.div`
  position: relative;

  height: 300px;
`

const Label = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  font-size: 14px;
  width: 50%;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Text = styled.p`
  padding: 0;
  margin: 4px 0;
  font-size: ${props => props.fontsizecus ? props.fontsizecus : `14px`};
  font-weight: ${props => props.fontWeight ? props.fontWeight : `500`};
`