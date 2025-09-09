import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} AZANIKA. All rights reserved.
        </p>
        <div className="mt-4">
          <a href="/privacy-policy" className="text-cream-400 hover:text-cream-300 mx-2">Privacy Policy</a>
          <a href="/terms-of-service" className="text-cream-400 hover:text-cream-300 mx-2">Terms of Service</a>
          <a href="/contact" className="text-cream-400 hover:text-cream-300 mx-2">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;