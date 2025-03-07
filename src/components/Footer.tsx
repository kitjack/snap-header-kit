
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 mt-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* New Footer Columns Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 border-b border-gray-200 pb-10">
          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-primary text-sm">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-primary text-sm">About</Link></li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-600 hover:text-primary text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-600 hover:text-primary text-sm">Terms of Service</Link></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Contact</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-600 hover:text-primary text-sm">Contact Us</Link></li>
              <li>
                <a href="mailto:support@wpress.ai" className="text-gray-600 hover:text-primary text-sm flex items-center gap-1">
                  <Mail className="h-3.5 w-3.5" />
                  support@wpress.ai
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Original Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                wpress<span className="text-primary">.ai</span>
              </Link>
            </div>
            <p className="text-gray-600 text-sm">
              The largest collection of free AI tools for WordPress. Embed or use for free.
            </p>
          </div>

          {/* Business Tools Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Business Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/business-name-generator" className="text-gray-600 hover:text-primary text-sm">Business Name Generator</Link></li>
              <li><Link to="/tools/etsy-tag-generator" className="text-gray-600 hover:text-primary text-sm">Etsy Tag Generator</Link></li>
              <li><Link to="/tools/slogan-generator" className="text-gray-600 hover:text-primary text-sm">Slogan Generator</Link></li>
              <li><Link to="/tools/domain-name-generator" className="text-gray-600 hover:text-primary text-sm">Domain Name Generator</Link></li>
              <li><Link to="/tools/etsy-shop-name-generator" className="text-gray-600 hover:text-primary text-sm">Etsy Shop Name Generator</Link></li>
            </ul>
          </div>

          {/* Social Tools Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Social Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/linkedin-bio-generator" className="text-gray-600 hover:text-primary text-sm">LinkedIn Bio Generator</Link></li>
              <li><Link to="/tools/social-media-bio-generator" className="text-gray-600 hover:text-primary text-sm">Social Media Bio Generator</Link></li>
            </ul>
          </div>

          {/* Lifestyle Tools Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-800">Lifestyle Tools</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/prompt-enhancer" className="text-gray-600 hover:text-primary text-sm">AI Prompt Enhancer</Link></li>
              <li><Link to="/tools/short-poem-generator" className="text-gray-600 hover:text-primary text-sm">Short Poem Generator</Link></li>
              <li><Link to="/tools/quote-generator" className="text-gray-600 hover:text-primary text-sm">Quote Generator</Link></li>
              <li><Link to="/tools/horror-story-generator" className="text-gray-600 hover:text-primary text-sm">Horror Story Generator</Link></li>
              <li><Link to="/tools/newsletter-generator" className="text-gray-600 hover:text-primary text-sm">Newsletter Generator</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 mt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 wpress.ai. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-primary text-sm">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-primary text-sm">Terms of Service</Link>
            <Link to="/contact" className="flex items-center text-gray-500 hover:text-primary text-sm gap-1">
              <Mail className="h-3.5 w-3.5" />
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
