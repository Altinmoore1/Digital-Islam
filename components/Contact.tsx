
import React from 'react';
import { LOCATIONS, BANK_ACCOUNTS, CONTACT_EMAIL, CONTACT_PHONES } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          
          <div>
            <h2 className="serif text-4xl mb-12">Connect With Us</h2>
            
            <div className="space-y-8 mb-12">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-green-800 rounded-xl flex items-center justify-center text-xl">📧</div>
                <div>
                  <p className="text-green-300 text-sm font-bold uppercase">Email</p>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-xl font-medium hover:text-yellow-400 transition-colors">{CONTACT_EMAIL}</a>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-green-800 rounded-xl flex items-center justify-center text-xl">📞</div>
                <div>
                  <p className="text-green-300 text-sm font-bold uppercase">Phone</p>
                  <div className="flex flex-col">
                    {CONTACT_PHONES.map(phone => (
                      <a key={phone} href={`tel:${phone.replace(/\s/g, '')}`} className="text-xl font-medium hover:text-yellow-400 transition-colors">{phone}</a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {LOCATIONS.map((loc, idx) => (
                <div key={idx} className="bg-green-800/50 p-6 rounded-2xl border border-green-700/50">
                  <p className="text-green-300 text-xs font-bold uppercase mb-2 tracking-widest">{loc.type}</p>
                  <p className="text-white font-medium">{loc.address}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white text-green-900 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
            
            <h3 className="serif text-3xl mb-8 relative">Banking Details</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Use the following accounts for direct bank transfers. All donations are handled with strict transparency and accountability.
            </p>

            <div className="space-y-8">
              {BANK_ACCOUNTS.map((acc, idx) => (
                <div key={idx} className="border-b border-green-100 pb-6 last:border-0">
                  <p className="font-bold text-green-700 text-sm uppercase mb-1">{acc.bank}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Account Name:</span>
                      <span className="font-bold">{acc.name}</span>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg flex justify-between items-center group">
                      <code className="text-green-900 font-mono text-xs md:text-sm">{acc.iban}</code>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(acc.iban);
                          alert('Account number copied!');
                        }}
                        className="text-green-700 hover:text-green-900 text-xs font-bold uppercase underline"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-xl flex gap-3 items-start">
              <span className="text-xl">ℹ️</span>
              <p className="text-xs text-yellow-800">Please include your name and the project you wish to support as a reference when making a transfer.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
