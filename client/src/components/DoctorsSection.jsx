import React from 'react';
import { Star, Calendar } from 'lucide-react';

const FeaturedDoctors = () => {
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.9,
      reviews: 127,
      experience: '15 years',
      availability: 'Available Today',
      image: '/api/placeholder/80/80',
      consultationFee: '$80'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurologist',
      rating: 4.8,
      reviews: 98,
      experience: '12 years',
      availability: 'Next Available: Tomorrow',
      image: '/api/placeholder/80/80',
      consultationFee: '$90'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrician',
      rating: 4.9,
      reviews: 156,
      experience: '10 years',
      availability: 'Available Today',
      image: '/api/placeholder/80/80',
      consultationFee: '$70'
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedist',
      rating: 4.7,
      reviews: 89,
      experience: '18 years',
      availability: 'Available Tomorrow',
      image: '/api/placeholder/80/80',
      consultationFee: '$85'
    }
  ];

  const handleBookAppointment = (doctorId) => {
    console.log(`Booking appointment with doctor ${doctorId}`);
    // Add booking logic here
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Doctors</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with our top-rated doctors across various specialties. Book online consultations or in-person visits.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-gray-900">{doctor.experience}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium ml-1 text-gray-900">{doctor.rating}</span>
                    <span className="text-gray-500 text-xs ml-1">({doctor.reviews})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Consultation</span>
                  <span className="font-medium text-green-600">{doctor.consultationFee}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  {doctor.availability}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{width: `${doctor.rating * 20}%`}}></div>
                </div>
              </div>
              
              <button 
                onClick={() => handleBookAppointment(doctor.id)}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-md hover:shadow-lg"
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
            View All Doctors →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;