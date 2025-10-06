import Header from '../components/Header/Header';
import HeroSection from '../components/Hero/HeroSection';
import FeaturesSection from '../components/Features/FeaturesSection';
import Divider from '../components/common/Divider';
import ContactSection from '../components/Contact/ContactSection';
import Footer from '../components/Footer/Footer';

const Home = () => {
    return (
        <div className="min-h-screen w-full py-5 bg-white flex flex-col justify-start items-center gap-14">
            <Header />
            <HeroSection />

            <section id="recursos">
                <FeaturesSection />
            </section>

            <section id="fale-conosco">
                <ContactSection />
            </section>

            <Divider />

            <section id="footer">
                <Footer />
            </section>
        </div>
    );
};

export default Home;