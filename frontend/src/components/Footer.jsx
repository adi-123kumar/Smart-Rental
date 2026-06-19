import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Smart Rental
          </h2>

          <p className="text-gray-400">
            Find verified rental properties
            across India with ease.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Company
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Services
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>Rent Property</li>
            <li>List Property</li>
            <li>Property Search</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">
            <FaFacebook />
            <FaInstagram />
            <FaLinkedin />
            <FaGithub />
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 py-4 text-center text-gray-400">
        © 2026 Smart Rental. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;