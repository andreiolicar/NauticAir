// src/pages/Register.jsx
import { motion } from 'framer-motion';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Divider from '../components/common/Divider';
import RegisterForm from '../components/Auth/RegisterForm';
import { fadeIn } from '../utils/animations';

const Register = () => {
  return (
    <div className="min-h-screen w-full py-5 bg-white flex flex-col justify-start items-center gap-10 md:gap-14">
      <Header />

      <motion.main 
        className="w-full flex justify-center items-center px-4 md:px-0 py-4 md:py-0"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <RegisterForm />
      </motion.main>

      <Divider />
      <Footer />
    </div>
  );
};

export default Register;
