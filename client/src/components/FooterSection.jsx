import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    'Home', 'About Us', 'Services', 'Doctors', 'Contact', 'Privacy Policy'
  ];

  const healthcareServices = [
    'Online Consultation', 'Hospital Booking', 'Lab Tests', 'Medicine Delivery', 'Emergency Care', 'Health Checkups'
  ];

  const specialties = [
    'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'Ophthalmology'
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-white text-black">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-xl mb-4 inline-block">
              HealthCare+
            </div>
            <p className="text-black text-sm mb-6 leading-relaxed">
              Your trusted healthcare partner providing quality medical services, online consultations, 
              and comprehensive health solutions with expert doctors available 24/7.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-black">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-black hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Healthcare Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              {healthcareServices.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-black hover:text-white transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-white">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-4 w-4 mr-3 mt-1 text-blue-400" />
                <div>
                  <p className="text-black text-sm">General Inquiries</p>
                  <p className="text-white font-medium">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-3 mt-1 text-blue-400" />
                <div>
                  <p className="text-black text-sm">Email Us</p>
                  <p className="text-white font-medium">info@healthcareplus.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-1 text-blue-400" />
                <div>
                  <p className="text-black text-sm">Visit Us</p>
                  <p className="text-white font-medium">123 Healthcare Ave</p>
                  <p className="text-black text-sm">Medical City, MC 12345</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-4 w-4 mr-3 mt-1 text-blue-400" />
                <div>
                  <p className="text-black text-sm">Working Hours</p>
                  <p className="text-white font-medium">24/7 Emergency</p>
                  <p className="text-black text-sm">Mon-Fri: 8AM-8PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="bg-red-600 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="text-xl font-bold text-white mb-2">Medical Emergency?</h4>
                <p className="text-red-100 text-sm">
                  Our emergency services are available 24/7. Get immediate medical assistance.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <a 
                  href="tel:911" 
                  className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors text-center"
                >
                  Call 911
                </a>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-red-600 font-bold transition-colors">
                  Request Ambulance
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h4 className="font-semibold text-lg mb-4 text-white">Medical Specialties</h4>
          <div className="flex flex-wrap gap-3">
            {specialties.map((specialty, index) => (
              <span 
                key={index}
                className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-gray-700 cursor-pointer transition-colors"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; 2024 HealthCare+. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons - Emergency Contact */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="space-y-3">
          <a 
            href="tel:911"
            className="block w-14 h-14 bg-red-600 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center hover:scale-110 transform duration-200"
            title="Emergency Call"
          >
            <Phone className="h-6 w-6 text-white" />
          </a>
          <button 
            className="block w-14 h-14 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center hover:scale-110 transform duration-200"
            title="Book Appointment"
          >
            <Mail className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;