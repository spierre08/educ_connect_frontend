import Footer from '../components/footer';
import Menu from '../components/menu';
import AboutElement from './components/About-Element';

export default function About() {
  return (
    <div className="bg-[#f6e8e8]">
      <Menu />
      <AboutElement />
      <Footer />
    </div>
  );
}