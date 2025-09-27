import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const HealthcareServices = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      icon: '🩺',
      title: 'Online Consultation',
      description: 'Connect with doctors from your home',
      features: ['Video consultation', 'Instant messaging', 'Digital prescriptions', 'Follow-up care'],
      color: 'from-blue-400 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      icon: '🏥',
      title: 'Hospital Scheduling',
      description: 'Book appointments with ease',
      features: ['Real-time availability', 'Multiple locations', 'Specialist booking', 'Insurance accepted'],
      color: 'from-green-400 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 3,
      icon: '💊',
      title: 'Medicine Services',
      description: '24/7 emergency medical assistance',
      features: ['Prescription delivery', 'Medicine reminders', 'Drug interactions', 'Pharmacy network'],
      color: 'from-purple-400 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 4,
      icon: '🧪',
      title: 'Lab Tests',
      description: 'Book lab tests and get results online',
      features: ['Home collection', 'Digital reports', 'Expert analysis', 'Quick turnaround'],
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 5,
      icon: '🚑',
      title: 'Ambulance Delivery',
      description: 'Emergency medical transport',
      features: ['24/7 availability', 'GPS tracking', 'Trained paramedics', 'ICU ambulance'],
      color: 'from-red-400 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 6,
      icon: '💖',
      title: 'Heart Checkup',
      description: 'Comprehensive cardiac health screening',
      features: ['ECG testing', 'Echo cardiogram', 'Stress testing', 'Cardiac consultation'],
      color: 'from-pink-400 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    }
  ];

  const handleLearnMore = (serviceId) => {
    console.log(`Learn more about service ${serviceId}`);
    // Add navigation logic here
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Healthcare Services</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare solutions designed to meet all your medical needs with cutting-edge technology and expert care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`bg-white border-2 ${service.borderColor} rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className={`${service.bgColor} w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${hoveredService === service.id ? 'scale-110' : ''}`}>
                <span className="text-2xl">{service.icon}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
              
              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <div className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${service.color}`}></div>
                    {feature}
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => handleLearnMore(service.id)}
                className={`group flex items-center text-sm font-medium transition-all duration-300 ${
                  hoveredService === service.id 
                    ? 'text-blue-700' 
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                Learn More 
                <ArrowRight className={`h-4 w-4 ml-1 transition-transform duration-300 ${
                  hoveredService === service.id ? 'translate-x-1' : ''
                }`} />
              </button>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Immediate Medical Attention?</h3>
            <p className="text-blue-100 mb-6">
              Our emergency services are available 24/7. Get connected with medical professionals instantly.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Emergency Consultation
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Call Ambulance
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareServices;