import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/main";

const Layout = () => {

    return (
        <>
            <Header></Header>
            <Main></Main>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}

export default Layout;