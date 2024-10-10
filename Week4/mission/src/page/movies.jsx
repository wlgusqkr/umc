import { Link } from "react-router-dom";
import styled from "styled-components";



const Movies = () => {
  return (
    <div>
      <h3>카테고리</h3>
      <Container>
        <Card url={'../../public/images/first.png'}>
          <Link to={'/movies/now_playing'}>
            <Label>현재 상영중인</Label>
          </Link>
        </Card>
        <Card url={'../../public/images/second.png'}>
          <Link to={'/movies/popular'}>
            <Label>인기있는</Label>
          </Link>
        </Card>
        <Card url={'../../public/images/third.png'}>
          <Link to={'/movies/top_rated'}>
            <Label>높은 평가를 받은</Label>
          </Link>
        </Card>
        <Card url={'../../public/images/four.png'}>
          <Link to={'/movies/upcoming'}>
            <Label>개봉 예정중인</Label>
          </Link>
        </Card>
      </Container>
    </div>
  )
}

export default Movies;

const Container = styled.div`
  display: flex;
  gap: 15px;
  margin-top:16px;
`

const Card = styled.div`
  width: 25%;
  height: 250px;
  border-radius: 10px;
  background-image: url(${props => props.url ? props.url : '#'});
  background-size: cover;
  position: relative;
`


const Label = styled.div`
  position: absolute;
  top: 200px;
  left: 15px;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 14px;
  border-radius: 4px;
`;