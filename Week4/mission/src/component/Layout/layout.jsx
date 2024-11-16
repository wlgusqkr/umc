import Nav from "./nav";
import SideBar from "./sidebar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import UserInformationProvider from "./UserInformationProvider";

// export const UserInformationContext = createContext();

const Layout = () => {
  // const [userInformation, setUserInformation] = useState();
  // const Information = useContext(UserInformationContext)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <UserInformationProvider>
        <Nav />
        <Contents>
          <SideBar />
          <Container>
            <Outlet />
          </Container>
        </Contents>
      </UserInformationProvider>
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
    min-height: calc(100vh - 70px); /* Nav 높이만큼 뺀 공간을 차지하도록 설정 */
`;