import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection'
import CategorySection from '../Components/CategorySection'
import TopSelling from '../Components/TopSelling';
import NutsSection from '../Components/NutsSection';
import Footer from '../Components/Footer';

function Index() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <CategorySection />
      <TopSelling />
      <NutsSection />
      <Footer />
    </>
  );
}
export default Index;