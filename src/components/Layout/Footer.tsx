import { Link } from 'react-router-dom';
import { FaCar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaCar className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">OlioCar</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted partner for comfortable and reliable car booking services across India.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-muted-foreground hover:text-primary transition-colors">
                  Booking
                </Link>
              </li>
              <li>
                <Link to="/tour-packages" className="text-muted-foreground hover:text-primary transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Local Cab Booking</li>
              <li className="text-muted-foreground">Airport Transfer</li>
              <li className="text-muted-foreground">Outstation Travel</li>
              <li className="text-muted-foreground">Driver on Hire</li>
              <li className="text-muted-foreground">Tour Packages</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-muted-foreground">
                <FaMapMarkerAlt className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <span>123 Main Street, Bangalore, Karnataka 560001</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <FaPhone className="h-5 w-5 text-primary flex-shrink-0" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center space-x-2 text-muted-foreground">
                <FaEnvelope className="h-5 w-5 text-primary flex-shrink-0" />
                <span>info@oliocar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} OlioCar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
