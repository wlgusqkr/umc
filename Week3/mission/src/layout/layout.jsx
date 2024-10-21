import Nav from "./nav";
import SideBar from "./sidebar";
import Main from "../page/main";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', height: "100%", }}>
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
    min-height: 100vh;
`;