import React, { useEffect, useState } from 'react';
import { getBanks } from '../services/monimeService';
import { Bank } from '../types';

interface BankSelectorProps {
    onSelect: (bank: Bank) => void;
    selectedBankId?: string;
}

const BankSelector: React.FC<BankSelectorProps> = ({ onSelect, selectedBankId }) => {
    const [banks, setBanks] = useState<Bank[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBanks = async () => {
            setLoading(true);
            try {
                const result = await getBanks('SL'); // Default to Sierra Leone
                setBanks(result);
            } catch (err: any) {
                console.error("Monime API Error:", err);
                setError(`Failed to load bank list: ${err.message || "Unknown error"}`);
            } finally {
                setLoading(false);
            }
        };
        fetchBanks();
    }, []);

    if (loading) return <div className="text-gray-500 text-sm animate-pulse">Loading supported banks...</div>;
    if (error) return <div className="text-red-500 text-sm">{error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
            {banks.map((bank) => (
                <button
                    key={bank.providerId}
                    type="button" // Prevent form submission
                    onClick={() => onSelect(bank)}
                    className={`text-left p-3 rounded-xl border transition-all flex items-center gap-3 group
            ${selectedBankId === bank.providerId
                            ? 'border-green-600 bg-green-50 ring-1 ring-green-600'
                            : 'border-gray-200 hover:border-green-400 hover:bg-green-50/50'
                        }
          `}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 
            ${selectedBankId === bank.providerId ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 group-hover:bg-green-50 group-hover:text-green-600'}
          `}>
                        <span className="font-bold text-xs">{bank.providerId.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                        <p className={`font-bold text-sm leading-tight ${selectedBankId === bank.providerId ? 'text-green-900' : 'text-gray-700'}`}>
                            {bank.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{bank.country}</p>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default BankSelector;
