import Creations from "./_components/Creations";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import HomeBar from "./_components/HomeBar";



export default function Home() {
  return (
    <div className="min-h-screen ">
      <HomeBar />
      <Hero/>
      <Creations/>
      <Footer/>
    </div>
  )
}
