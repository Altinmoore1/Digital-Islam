import React, { useState } from 'react';
import { addVolunteer, addDonor } from '../services/contentService';
import { createCheckoutSession } from '../services/monimeService';
import { useAppData } from '../context/DataContext';

const GetInvolved: React.FC = () => {
  const { data } = useAppData();
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [volunteerData, setVolunteerData] = useState({ name: '', email: '', phone: '', occupation: '', location: '' });
  const [donorData, setDonorData] = useState({ name: '', email: '', phone: '', occupation: '', location: '', project: 'General Support', pledge: '' });


  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addVolunteer(volunteerData);
      alert("Thank you for volunteering! We will be in touch.");
      setShowVolunteerForm(false);
      setVolunteerData({ name: '', email: '', phone: '', occupation: '', location: '' });
    } catch (e) {
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDonorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      // Monime Checkout Integration
      const amount = parseFloat(donorData.pledge.replace(/[^0-9.]/g, ''));

      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount (e.g., 50)");
        setIsSubmitting(false);
        return;
      }

      await addDonor(donorData); // Keep record in Firebase (optional)

      const session = await createCheckoutSession(amount, {
        name: donorData.name,
        email: donorData.email,
        phone: donorData.phone,
        project: donorData.project
      });

      if (session && session.redirectUrl) {
        window.location.href = session.redirectUrl;
      } else {
        alert("Failed to initialize payment. Please try again.");
      }

    } catch (e: any) {
      console.error("Submission Error", e);
      alert(`Error processing your request: ${e.message || "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="get-involved" className="py-24 bg-white overflow-hidden relative">
      {/* Modals */}
      {showVolunteerForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setShowVolunteerForm(false)} className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-gray-600">&times;</button>
            <h2 className="text-2xl font-bold text-green-900 mb-6">Join Our Team</h2>
            <form onSubmit={handleVolunteerSubmit} className="space-y-4">
              <input placeholder="Full Name" required className="w-full p-3 border rounded-lg" value={volunteerData.name} onChange={e => setVolunteerData({ ...volunteerData, name: e.target.value })} />
              <input placeholder="Email Address" type="email" required className="w-full p-3 border rounded-lg" value={volunteerData.email} onChange={e => setVolunteerData({ ...volunteerData, email: e.target.value })} />
              <input placeholder="Phone Number" type="tel" required className="w-full p-3 border rounded-lg" value={volunteerData.phone} onChange={e => setVolunteerData({ ...volunteerData, phone: e.target.value })} />
              <input placeholder="Occupation" required className="w-full p-3 border rounded-lg" value={volunteerData.occupation} onChange={e => setVolunteerData({ ...volunteerData, occupation: e.target.value })} />
              <input placeholder="Location (City, Area or Street)" required className="w-full p-3 border rounded-lg" value={volunteerData.location} onChange={e => setVolunteerData({ ...volunteerData, location: e.target.value })} />
              <button disabled={isSubmitting} className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 disabled:opacity-50">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}

      {showDonorForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
            <button onClick={() => setShowDonorForm(false)} className="absolute top-4 right-4 text-2xl font-bold text-gray-400 hover:text-gray-600">&times;</button>
            <h2 className="text-2xl font-bold text-green-900 mb-6">Make a Donation</h2>
            <p className="text-gray-600 mb-4 text-sm">Fill out the form below to proceed to payment.</p>

            <form onSubmit={handleDonorSubmit} className="space-y-4">
              <input placeholder="Full Name" required className="w-full p-3 border rounded-lg" value={donorData.name} onChange={e => setDonorData({ ...donorData, name: e.target.value })} />
              <input placeholder="Email Address" type="email" required className="w-full p-3 border rounded-lg" value={donorData.email} onChange={e => setDonorData({ ...donorData, email: e.target.value })} />
              <input placeholder="Phone Number" type="tel" required className="w-full p-3 border rounded-lg" value={donorData.phone} onChange={e => setDonorData({ ...donorData, phone: e.target.value })} />

              <input placeholder="Occupation" required className="w-full p-3 border rounded-lg" value={donorData.occupation} onChange={e => setDonorData({ ...donorData, occupation: e.target.value })} />
              <input placeholder="Location (City, Country)" required className="w-full p-3 border rounded-lg" value={donorData.location} onChange={e => setDonorData({ ...donorData, location: e.target.value })} />

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Project to Support</label>
                <select
                  className="w-full p-3 border rounded-lg bg-white"
                  value={donorData.project}
                  onChange={e => setDonorData({ ...donorData, project: e.target.value })}
                >
                  <option>General Support</option>
                  {data.projects.map(project => (
                    <option key={project.id} value={project.title}>{project.title}</option>
                  ))}
                </select>
              </div>

              <div className="border-t pt-2 mt-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Donation Amount (SLE)</label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g., 50"
                  required
                  className="w-full p-3 border rounded-lg font-bold text-lg"
                  value={donorData.pledge}
                  onChange={e => setDonorData({ ...donorData, pledge: e.target.value })}
                />
              </div>
              <button disabled={isSubmitting} className="w-full bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 disabled:opacity-50">
                {isSubmitting ? 'Processing...' : 'Proceed to Payment (Monime)'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Volunteer Section */}
          <div className="relative group p-1">
            <div className="absolute inset-0 bg-green-700 rounded-3xl rotate-1 group-hover:rotate-0 transition-transform duration-300 -z-10"></div>
            <div className="bg-white p-10 rounded-3xl border-2 border-green-700 h-full flex flex-col justify-between">
              <div>
                <h2 className="serif text-3xl text-green-900 mb-6">Volunteer With Us</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Become part of our mission by volunteering in any of our sectors—charity distribution, education programs, media production, or community outreach. Your time and skills can make a lasting impact on lives across Sierra Leone.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-green-50 rounded-xl text-green-800 text-sm font-medium text-center">Event Coordination</div>
                  <div className="p-4 bg-green-50 rounded-xl text-green-800 text-sm font-medium text-center">Media Production</div>
                  <div className="p-4 bg-green-50 rounded-xl text-green-800 text-sm font-medium text-center">Community Outreach</div>
                  <div className="p-4 bg-green-50 rounded-xl text-green-800 text-sm font-medium text-center">Charity Support</div>
                </div>
              </div>
              <button onClick={() => setShowVolunteerForm(true)} className="w-full bg-green-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 transition-all shadow-lg">
                Join Our Team
              </button>
            </div>
          </div>

          {/* Donate Section */}
          <div id="donate" className="bg-green-50 p-10 rounded-3xl border border-green-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">🎁</span>
                <h2 className="serif text-3xl text-green-900">Make a Donation</h2>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Your donations help us sustain and expand our programs. Every contribution directly supports education, humanitarian aid, and community development.
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-green-200 flex items-center justify-between shadow-sm">
                  <div className="font-bold text-green-900">One-time Donation</div>
                  <div className="text-green-700 cursor-pointer hover:underline" onClick={() => setShowDonorForm(true)}>Give Today</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-200 flex items-center justify-between shadow-sm">
                  <div className="font-bold text-green-900">Monthly Contribution</div>
                  <div className="text-green-700 cursor-pointer hover:underline" onClick={() => setShowDonorForm(true)}>Sustainable Impact</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-200 flex items-center justify-between shadow-sm">
                  <div className="font-bold text-green-900">Zakat & Sadaqah</div>
                  <div className="text-green-700 cursor-pointer hover:underline" onClick={() => setShowDonorForm(true)}>Faithful Giving</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowDonorForm(true)}
              className="w-full bg-white border-2 border-green-700 text-green-700 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all text-center shadow-md mb-2"
            >
              Make a Pledge
            </button>
            <a
              href="#contact"
              className="block text-center text-sm text-green-600 hover:text-green-800"
            >
              Or See Bank Details Below
            </a>
          </div>
        </div>
      </div>
    </section >
  );
};

export default GetInvolved;
