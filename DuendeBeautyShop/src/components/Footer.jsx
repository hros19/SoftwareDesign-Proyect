import "../css/Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="container">
            <div className="d-flex flex-row justify-content-between col-12">
                <div className="footer-col">
                    <p className="Title-1">Categorías</p>
                    <ul>
                        <li><a href="#">Accesorios</a></li>
                        <li><a href="#">our services</a></li>
                        <li><a href="#">privacy policy</a></li>
                        <li><a href="#">affiliate program</a></li>
                        <li><a href="#">privacy policy</a></li>
                        <li><a href="#">affiliate program</a></li>
                        <li><a href="#">privacy policy</a></li>
                        <li><a href="#">affiliate program</a></li>
                        
                    </ul>
                </div>
                <div className="footer-col">
                    <p className="Title-1">Duende Beauty Shop</p>
                    <p className="Option-1">Redes Sociales:</p>
                    <div className="social-links">
                        <a href="#" className="social-icon"><FaFacebook className="icon mt-3" /></a>
                        <a href="#" className="social-icon"><FaTwitter className="icon mt-3" /></a>
                        <a href="#" className="social-icon"><FaInstagram className="icon mt-3" /></a>
                        <a href="#" className="social-icon"><FaLinkedin className="icon mt-3" /></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;