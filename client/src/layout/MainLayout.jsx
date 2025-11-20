import HeaderNav from "../components/HeaderComponents";
import Footer from "../components/FooterSection";
import { Outlet } from 'react-router-dom';


const MainLayout = ()=>{
return(
    <>
    <HeaderNav/>
    <main>
        <Outlet />
    </main>
    <Footer/>
    </>
)
}

export default MainLayout; 