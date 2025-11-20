import HeroSection from "../components/HeroComponent";
import FeaturedDoctors from "../components/DoctorsSection";
import HealthcareServices from "../components/HealthServicesSection";
import SearchSection from "../components/SearchSection";
// import AppointmentBooking from "../components/BookingSection";
import BookAppointmentCard from "../components/BookingAppointmentCard";

const Home = ()=>{
return(
    <>
    <HeroSection/>
    <FeaturedDoctors/>
    <HealthcareServices/>
    <SearchSection/>
    </>
)
}

export default Home;