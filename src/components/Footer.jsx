import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-500 to-green-700 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <p>Contact us: <a href="mailto:panta87kg@gmail.com" className="underline">panta87kg@gmail.com</a></p>

        <p>&copy; 2023 My E-Commerce. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="text-white">
            <FaFacebook />
          </a>
          <a href="#" className="text-white">
            <FaTwitter />
          </a>
          <a href="#" className="text-white">
            <FaInstagram />
          </a>
          <a href="#" className="text-white">
            <FaLinkedin />
          </a>
          <a href="#" className="text-white">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
