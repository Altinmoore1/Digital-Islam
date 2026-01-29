import React, { useState, useEffect } from 'react';
import { RAMADAN_START_DATE, RAMADAN_END_DATE } from '../constants';

const RamadanCounter: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
    const [status, setStatus] = useState<'UPCOMING' | 'ONGOING' | 'COMPLETED'>('UPCOMING');
    const [currentDay, setCurrentDay] = useState<number>(0);

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();

            if (now < RAMADAN_START_DATE) {
                setStatus('UPCOMING');
                const difference = RAMADAN_START_DATE.getTime() - now.getTime();

                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else if (now >= RAMADAN_START_DATE && now <= RAMADAN_END_DATE) {
                setStatus('ONGOING');
                const diffInTime = now.getTime() - RAMADAN_START_DATE.getTime();
                const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
                setCurrentDay(diffInDays + 1); // +1 because day 0 is the start
            } else {
                setStatus('COMPLETED');
            }
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft && status === 'UPCOMING') return null;

    return (
        <section className="bg-gradient-to-r from-green-800 to-green-900 py-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {status === 'UPCOMING' && timeLeft && (
                    <div className="animate-fade-in-up">
                        <h2 className="serif text-3xl md:text-4xl mb-8 text-green-100">Counting Down to Ramadan 2026</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <div className="text-4xl md:text-5xl font-bold font-mono mb-2">{timeLeft.days}</div>
                                <div className="text-sm uppercase tracking-widest text-green-200">Days</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <div className="text-4xl md:text-5xl font-bold font-mono mb-2">{timeLeft.hours}</div>
                                <div className="text-sm uppercase tracking-widest text-green-200">Hours</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <div className="text-4xl md:text-5xl font-bold font-mono mb-2">{timeLeft.minutes}</div>
                                <div className="text-sm uppercase tracking-widest text-green-200">Minutes</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <div className="text-4xl md:text-5xl font-bold font-mono mb-2">{timeLeft.seconds}</div>
                                <div className="text-sm uppercase tracking-widest text-green-200">Seconds</div>
                            </div>
                        </div>
                        <p className="mt-8 text-lg text-green-200 italic">"O you who have believed, decreed upon you is fasting..." (2:183)</p>
                    </div>
                )}

                {status === 'ONGOING' && (
                    <div className="animate-fade-in-up">
                        <h2 className="serif text-3xl md:text-4xl mb-4 text-green-100">Ramadan Mubarak!</h2>
                        <div className="inline-block bg-white/10 backdrop-blur-md rounded-full px-8 py-3 border border-white/20 mb-6">
                            <span className="text-xl md:text-2xl font-bold">Day {currentDay}</span> of Ramadan
                        </div>
                        <div className="w-full max-w-2xl mx-auto bg-green-950/50 rounded-full h-4 overflow-hidden border border-green-700/50">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all duration-1000"
                                style={{ width: `${(currentDay / 30) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {status === 'COMPLETED' && (
                    <div className="animate-fade-in-up">
                        <h2 className="serif text-4xl md:text-5xl mb-4 text-yellow-400">Eid Mubarak!</h2>
                        <p className="text-xl text-green-100 mb-6">May Allah accept our fasting and prayers.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RamadanCounter;
