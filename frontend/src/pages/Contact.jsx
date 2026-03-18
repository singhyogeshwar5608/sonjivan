import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Home as HomeIcon, Building } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const LocationCard = ({ title, address, phone1, phone2, icon }) => {
  const Icon = icon;
  return (
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
    <div className="flex items-start space-x-3 mb-4">
      <div className="bg-primary/10 p-3 rounded-full">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-textDark">{title}</h3>
    </div>
    <div className="space-y-3">
      <p className="flex items-start text-gray-600 text-sm">
        <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1 mr-2" />
        <span>{address}</span>
      </p>
      {phone1 && (
        <p className="flex items-center text-gray-600 text-sm">
          <Phone className="w-4 h-4 text-primary mr-2" />
          <a href={`tel:${phone1.replace(/[- ]/g, '')}`} className="hover:text-primary transition-colors">
            {phone1}
          </a>
          {phone2 && (
            <>
              <span className="mx-2 text-gray-400">|</span>
              <a href={`tel:${phone2.replace(/[- ]/g, '')}`} className="hover:text-primary transition-colors">
                {phone2}
              </a>
            </>
          )}
        </p>
      )}
    </div>
  </div>
  );
};

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const locations = [
    {
      title: "Son Jivan grocry Store",
      address: "Property No. G 454 GF New Delhi Kh No 1567, Ph-6, Aya Nagar G Block, Delhi-110047",
      phone1: "+91-94614-94614",
      phone2: null,
      icon: Building
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save inquiry to Firebase
      const inquiriesRef = collection(db, 'inquiries');
      const inquiryData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
        status: 'new',
        createdAt: serverTimestamp(),
        read: false
      };
      
      await addDoc(inquiriesRef, inquiryData);
      console.log('Inquiry saved to Firebase:', inquiryData);

      // Send inquiry to WhatsApp
      const companyWhatsApp = '919992880001'; // Company WhatsApp number
      const whatsappMessage = `*New Inquiry from Website*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Service:* ${formData.service}%0A*Message:* ${formData.message}`;
      const whatsappUrl = `https://wa.me/${companyWhatsApp}?text=${whatsappMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      console.log('Inquiry submitted successfully');
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contactTitle}</h1>
          <p className="text-xl text-blue-100">
            {t.contactSubtitle}
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="section-title">{t.getInTouch}</h2>
              <p className="text-gray-700 mb-8">
                {t.contactDescription}
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.visitOurStore}</h3>
                    <p className="text-gray-600">
                      Property No. G 454 GF New Delhi Kh No 1567,<br />
                      Ph-6, Aya Nagar G Block, Delhi-110047
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.callUs}</h3>
                    <p className="text-gray-600">
                      +91-94614-94614
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.emailUs}</h3>
                    <a
                      href="mailto:info@sonjivan.com"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      info@sonjivan.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{t.workingHours}</h3>
                    <p className="text-gray-600">
                      {t.mondaySaturday}: 9:00 AM - 7:00 PM<br />
                      {t.sunday}: 10:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="card p-8">
                <h2 className="text-2xl font-bold mb-6">{t.sendMessage}</h2>

                {submitted && (
                  <div className="bg-accent/10 border border-accent text-accent px-4 py-3 rounded mb-6">
                    {t.messageSent}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">{t.yourName} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder={t.yourName}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">{t.yourEmail} *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder={t.yourEmail}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">{t.yourPhone} *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder={t.yourPhone}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Product Category *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="">Select Category</option>
                      <option value="Cooking Oils">Cooking Oils & Ghee</option>
                      <option value="Spices">Spices & Masalas</option>
                      <option value="Grains">Grains & Pulses</option>
                      <option value="Snacks">Snacks & Packaged Foods</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">{t.yourMessage} *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="input-field"
                      placeholder={t.yourMessage}
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary w-full"
                    disabled={loading}
                  >
                    {loading ? t.loading : t.sendMessageBtn}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Locations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center">{t.ourLocation}</h2>
          <p className="section-subtitle text-center">
            {t.locationDescription}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <LocationCard key={index} {...location} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
