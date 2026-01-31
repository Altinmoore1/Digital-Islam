
import React from 'react';
import { Sector, LocationInfo, BankAccount } from './types';

export const SECTORS: Sector[] = [
  {
    id: 'charity',
    name: 'Charity',
    description: 'We believe service to humanity is an essential part of faith. Our charitable initiatives focus on supporting the most vulnerable members of society.',
    icon: '🤝',
    programs: [
      'Yearly Ramadan Feeding Project',
      'Eid Qurbani Program',
      'Widows Support Group',
      'Masjid and Madarasa Development',
      'Orphanages Support'
    ]
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Education is at the heart of Digital Islam. We provide accessible and engaging Islamic learning for all age groups.',
    icon: '📚',
    programs: [
      'Islamic Magazine Publication',
      'Weekly After Jummah Podcast',
      'Structured Madarasa Programs',
      'Youth Workshops'
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'We promote halal and value-driven entertainment that nurtures faith and creativity.',
    icon: '🎭',
    programs: [
      'Quranic Recitation Showcases',
      'Poetry & Anasheed Platforms',
      'Inspirational Newsletters',
      'Faith-based Creative Arts'
    ]
  },
  {
    id: 'ambassadorial',
    name: 'Ambassadorial',
    description: 'Our Youth Ambassador Program empowers young leaders to represent Digital Islam and promote positive Islamic values.',
    icon: '🌍',
    programs: [
      'Active in 200+ Communities',
      'Community Advocacy',
      'Leadership Development',
      'Youth Mentorship'
    ]
  }
];

export const LOCATIONS: LocationInfo[] = [
  { type: 'Office Address', address: '8 Stewards Street, Off Kroo Town Road' },
  { type: 'Masjid & Madarasa', address: '1 Cole Drive, Wilberforce' },
  { type: 'Orphanage (1)', address: '6 Mile, Waterloo' },
  { type: 'Orphanage (2)', address: 'Samaya Village, Tambaka Chiefdom' }
];

export const BANK_ACCOUNTS: BankAccount[] = [
  {
    bank: 'Sierra Leone Commercial Bank (SLCB)',
    name: 'Digital Islam',
    iban: '003001148417112146'
  },
  {
    bank: 'Zenith Bank',
    name: 'Digital Islam',
    iban: '012001407015268795'
  }
];

export const CONTACT_EMAIL = 'digitalislamsl@gmail.com';
export const CONTACT_PHONES = ['+232 079 447 730', '+232 030 135 412'];

// Ramadan 2026 Dates (Estimated)
export const RAMADAN_START_DATE = new Date('2026-02-18T00:00:00');
export const RAMADAN_END_DATE = new Date('2026-03-19T00:00:00');
