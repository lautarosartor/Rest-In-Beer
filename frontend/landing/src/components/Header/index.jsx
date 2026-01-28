import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Button, Collapse, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import '../components.css';

function Header() {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50); // Ajusta el valor para controlar cuándo se activa la transparencia
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <nav className={`nav-landing sticky top-0 z-[100]
        ${isScrolled ? 'bg-[#3B341F]/70 backdrop-blur-sm' : 'bg-[#3B341F]'}
        text-[#EFFFC8] transition-all duration-300`
      }
    >
      <div className="md:flex container mx-auto p-6 items-center justify-between hidden">
        <img src={logo} className="w-16" alt="logo" />
        <ul className="flex gap-6">
          <li>
            <a onClick={() => {
                window.scrollTo({ top: 0});
                navigate("/")
              }}
            >
              Inicio
            </a>
          </li>
          <li>
            <a href="#about">
              Nosotros
            </a>
          </li>
          <li>
            <a href="#menu">
              Menu
            </a>
          </li>
          <li>
            <a href="#services">
              Servicios
            </a>
          </li>
          <li>
            <a href="#testimonials">
              Testimonios
            </a>
          </li>
          <li>
            <a href="#contact">
              Contacto
            </a>
          </li>
        </ul>
      </div>

      <div className="md:hidden p-6">
        <div className="flex justify-between">
          <img src={logo} className="w-16" alt="logo" onClick={() => navigate("/admin/dashboard")} />
          <Button onClick={onToggle}>
            {!isOpen
              ? <HamburgerIcon className="text-3xl" />
              : <CloseIcon className="text-1xl" />
            }
          </Button>
        </div>

        <Collapse in={isOpen} animateOpacity unmountOnExit>
          <ul className="bg-[#3B341Fee] text-[#EFFFC8] absolute left-0 p-6 w-full flex flex-col items-end gap-6 z-10" style={{backdropFilter: 'blur(4px)'}}>
            <li>
              <a href="#home">
                Home
              </a>
            </li>
            <li>
              <a href="#about">
                About Us
              </a>
            </li>
            <li>
              <a href="#menu">
                Menu
              </a>
            </li>
            <li>
              <a href="#services">
                Services
              </a>
            </li>
            <li>
              <a href="#testimonials">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </Collapse>
      </div>
      
    </nav>
  )
}

export default Header