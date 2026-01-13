
export interface Program {
  title: string;
  description: string;
}

export interface Sector {
  id: string;
  name: string;
  description: string;
  icon: string;
  programs: string[];
}

export interface LocationInfo {
  type: string;
  address: string;
}

export interface BankAccount {
  bank: string;
  name: string;
  iban: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail?: string;
  goal?: string; // keeping as string for flexibility, consistent with pledge
  raised?: string; // keeping as string for flexibility
  date?: string;
}
