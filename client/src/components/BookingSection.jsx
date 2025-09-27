import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, ChevronDown } from 'lucide-react';

const AppointmentBooking = () => {
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    doctor: '',
    notes: ''
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '11:30 AM', available: false },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '03:00 PM', available: true },
    { time: '03:30 PM', available: true },
    { time: '04:00 PM', available: false },
    { time: '04:30 PM', available: true }
  ];

  const services = [
    'General Consultation',
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Dermatology',
    'Ophthalmology',
    'Psychiatry'
  ];

  const doctors = [
    'Dr. Sarah Johnson - Cardiologist',
    'Dr. Michael Chen - Neurologist',
    'Dr. Emily Rodriguez - Pediatrician',
    'Dr. James Wilson - Orthopedist',
    'Dr. Maria Garcia - Dermatologist',
    'Dr. David Kim - Ophthalmologist'
  ];

  const handleInputChange = (field, value) => {
    setAppointmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTimeSlotSelect = (time) => {
    setSelectedTimeSlot(time);
    handleInputChange('time', time);
  };

  const handleSubmit = () => {
    console.log('Appointment booking data:', appointmentData);
    // Add form validation and submission logic here
    alert('Appointment request submitted successfully!');
  };

  const isFormValid = () => {
    return appointmentData.name && 
           appointmentData.email && 
           appointmentData.phone && 
           appointmentData.service && 
           appointmentData.date && 
           appointmentData.time;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Book an Appointment</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule your consultation with our best doctors. Choose your preferred date, time, and specialist for personalized healthcare.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                    value={appointmentData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                    value={appointmentData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your phone number"
                  value={appointmentData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-600" />
                Medical Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Service *</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={appointmentData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                  >
                    <option value="">Choose a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Doctor</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={appointmentData.doctor}
                    onChange={(e) => handleInputChange('doctor', e.target.value)}
                  >
                    <option value="">Any available doctor</option>
                    {doctors.map((doctor, index) => (
                      <option key={index} value={doctor}>{doctor}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  rows="3"
                  placeholder="Describe your symptoms or concerns (optional)"
                  value={appointmentData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                ></textarea>
              </div>
            </div>

            {/* Date & Time Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Date & Time Selection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={appointmentData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Selected Time</label>
                  <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                    {selectedTimeSlot || 'Please select a time slot below'}
                  </div>
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Available Time Slots *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      disabled={!slot.available}
                      className={`p-3 text-sm border rounded-lg transition-all ${
                        selectedTimeSlot === slot.time 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                          : slot.available
                            ? 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 text-gray-700'
                            : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
                    >
                      {slot.time}
                      {!slot.available && (
                        <span className="block text-xs mt-1">Booked</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  className={`flex-1 py-4 rounded-lg font-semibold text-lg transition-all ${
                    isFormValid()
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Schedule Your Consultation
                </button>
                <button
                  type="button"
                  className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors"
                  onClick={() => {
                    setAppointmentData({
                      name: '', email: '', phone: '', service: '', date: '', time: '', doctor: '', notes: ''
                    });
                    setSelectedTimeSlot('');
                  }}
                >
                  Clear Form
                </button>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> You will receive a confirmation email within 15 minutes. 
                  If you need to reschedule, please contact us at least 24 hours in advance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBooking;