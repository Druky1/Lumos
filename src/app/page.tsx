import Creations from "./_components/Creations";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Hero2 from "./_components/Hero2";
import HomeBar from "./_components/HomeBar";



export default function Home() {
  return (
    <div className="min-h-screen ">
      <HomeBar />
      <Hero2/>
      <Creations/>
      <Footer/>
    </div>
  )
}
