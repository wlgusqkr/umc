import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
const SideBar = () => {
    return (
        <SidebarContainer>
            <p><IoSearch size={16} style={{marginRight: '8px'}}/><Link to={'/search'}>찾기</Link></p>
            <p><IoSearch size={16} style={{marginRight: '8px'}}/><Link to={'/movies'}>영화</Link></p>
        </SidebarContainer>
    )
}

export default SideBar;

const SidebarContainer = styled.div`
    padding-left: 16px;
    width: 160px;
    height: 100%;
    background-color: #212121;
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-top: 16px;
    text-align: left;
    font-weight: 700;
    & > p {
    }
`;