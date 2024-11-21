import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { UserInformationContext } from './UserInformationProvider';
import { useContext } from 'react';
const Nav = () => {
  const { userInformation, setUserInformation, deleteUserInformation } = useContext(UserInformationContext);


  return (
    <nav style={{ padding: '16px', width: '100%', height: '70px', backgroundColor: '#212121', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2><Link to={"/"} style={{ color: 'red' }}>YONGCHA</Link></h2>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        { userInformation ? (
          <>
            <p style={{ color: 'white'}}>{userInformation?.split('@')[0]}님 반갑습니다.</p>
            <Button color={'#212121'}><Link style={{ color: 'white' }} to={'/login'} onClick={()=>{deleteUserInformation()}}>로그아웃</Link></Button>
          </>
        ) : (
          <>
            <Button color={'#212121'}><Link style={{ color: 'white' }} to={'/login'}>로그인</Link></Button>
            <Button color={'#FF69B4'}><Link style={{ color: 'white' }} to={'/signup'}>회원가입</Link></Button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav;

const Button = styled.button`
    &:hover {
        top: 1px;
        border-color: rgba(0,0,0,0.34) rgba(0,0,0,0.21) rgba(0,0,0,0.21);
        box-shadow: 0 1px 0 rgba(255,255,255,0.89),0 1px rgba(0,0,0,0.05) inset;
        position: relative;
    }
    border-radius: '10px',
    height: 30px;
    color: white;
    padding: 4px 8px; 
    border-radius: 10px;
    background-color: ${props => props.color};
    display: inline-block;
    border: 1px solid rgba(0,0,0,0.21);
    border-bottom-color: rgba(0,0,0,0.34);
    text-shadow:0 1px 0 rgba(0,0,0,0.15);
    box-shadow: 0 1px 0 rgba(255,255,255,0.34) inset, 
    0 2px 0 -1px rgba(0,0,0,0.13), 
    0 3px 0 -1px rgba(0,0,0,0.08), 
    0 3px 13px -1px rgba(0,0,0,0.21);
`