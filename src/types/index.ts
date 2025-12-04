export type UserRole = 'admin' | 'coordinator' | 'therapist' | 'psychologist' | 'viewer';

export type AccommodationStatus = 'active' | 'discharged' | 'evaded' | 'terminated';

export type Gender = 'male' | 'female' | 'other';

export type MaritalStatus = 'single' | 'married' | 'divorced' | 'widowed' | 'stable_union';

export type SubstanceType = 
  | 'alcohol'
  | 'cocaine'
  | 'crack'
  | 'marijuana'
  | 'methamphetamine'
  | 'heroin'
  | 'lsd'
  | 'ecstasy'
  | 'inhalants'
  | 'prescription_drugs'
  | 'other';

export type ConsumptionMethod = 'oral' | 'smoked' | 'snorted' | 'injected' | 'inhaled';

export type FrequencyOfUse = 'daily' | 'weekly' | 'monthly' | 'occasional' | 'sporadic';

export type AppointmentType = 'individual' | 'group' | 'spiritual' | 'clinical' | 'family';

export type EvaluationType = 'psychological' | 'social' | 'clinical' | 'therapeutic';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface Resident {
  id: string;
  fullName: string;
  cpf: string;
  rg: string;
  birthDate: Date;
  gender: Gender;
  maritalStatus: MaritalStatus;
  education: string;
  birthplace: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact: EmergencyContact;
  judicialSituation?: string;
  admissionDate: Date;
  expectedDischargeDate?: Date;
  status: AccommodationStatus;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubstanceHistory {
  id: string;
  residentId: string;
  substance: SubstanceType;
  substanceOther?: string;
  startAge: number;
  durationYears: number;
  frequency: FrequencyOfUse;
  lastUseDate: Date;
  consumptionMethod: ConsumptionMethod;
  isPolyUser: boolean;
  relapseHistory: string;
  previousHospitalizations: number;
  treatmentAttempts: number;
  physicalImpacts: string;
  socialImpacts: string;
  familyImpacts: string;
  createdAt: Date;
}

export interface Evaluation {
  id: string;
  residentId: string;
  date: Date;
  professionalId: string;
  professionalName: string;
  type: EvaluationType;
  diagnosis: string;
  observations: string;
  behaviorScale: number; // 1-10
  disciplineScale: number; // 1-10
  commitmentScale: number; // 1-10
  evolutionSinceLastEval: string;
  attachments?: string[];
  createdAt: Date;
}

export interface Appointment {
  id: string;
  residentId: string;
  date: Date;
  type: AppointmentType;
  professionalId: string;
  professionalName: string;
  objective: string;
  report: string;
  referrals?: string;
  nextSteps?: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalResidents: number;
  activeResidents: number;
  dischargedThisMonth: number;
  pendingEvaluations: number;
  appointmentsThisWeek: number;
  averageStayDays: number;
}
