import { useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";
import userImage from '../img/xd.png';
import "../css/Navbar.css";

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Navbar() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsSubMenuOpen(false); // Cierra el submenú cuando se abre el menú de hamburguesa
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <nav>
      <h2 className="logo">Duende Beauty Shop</h2>
      
      <ul className={`nav-links mt-2 ${isMobileMenuOpen ? 'open-menu' : ''}`}>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Galería</a></li>
        <li><a href="#">Tienda</a></li>
        <li><a href="#">Sobre mí</a></li>
        <li><a href="#">Carrito</a></li>
      </ul>

      {/*<div className="user-info me-3" onClick={handleShow}>
          <img src={userImage} alt="User"/>
          <h6>Username</h6>
      </div>


      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
        <div className="user-info">
            <img src={userImage} alt="User" />
            <p>Username</p>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className="sub-menu">
          <a href="#" className="sub-menu-link">
            <FiUser className="icons-menu-users" />
            <p className="mt-3">Mi cuenta</p>
          </a>

          <a href="#" className="sub-menu-link">
            <FiLogOut className="icons-menu-users" />
            <p className="mt-3">Cerrar Sesión</p>
          </a>
        </div>
        </Offcanvas.Body>
      </Offcanvas>
  */}

      
      <div className={`sub-menu-wrap ${isSubMenuOpen ? 'open-menu' : ''}`} id="subMenu">
        <div className="sub-menu">
          <div className="user-info">
            <img src={userImage} alt="User" />
            <h3>Username</h3>
          </div>

          <a href="#" className="sub-menu-link">
            <FiUser className="icons-menu-users" />
            <p>Mi cuenta</p>
          </a>

          <a href="#" className="sub-menu-link">
            <FiLogOut className="icons-menu-users" />
            <p>Cerrar Sesión</p>
          </a>
        </div>
      </div>
      <div className={`mobile-menu-icon ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <img
        src={userImage}
        className={`user-pic ${isMobileMenuOpen ? 'hidden' : ''}`}
        onClick={toggleMenu}
      />
      
    </nav>
  );
}

export default Navbar;
