import Nav from "./nav";
import SideBar from "./sidebar";
import Main from "../page/main";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
            <Nav />
            <Contents>
                <SideBar />
                <Container>
                    <Outlet />
                </Container>
            </Contents>
        </div>
    )
}

export default Layout;

const Container = styled.div`
    padding: 1rem;
    flex: 1;
`

const Contents = styled.div`
    display: flex;
    flex: 1;
    height: calc(100vh - 70px); /* Nav 높이만큼 뺀 공간을 차지하도록 설정 */
`;