import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Resident, Evaluation, Appointment, SubstanceHistory } from '@/types';
import {
  mockResidents as initialResidents,
  mockEvaluations as initialEvaluations,
  mockAppointments as initialAppointments,
  mockSubstanceHistory as initialSubstanceHistory,
} from '@/data/mockData';

interface DataContextType {
  residents: Resident[];
  evaluations: Evaluation[];
  appointments: Appointment[];
  substanceHistory: SubstanceHistory[];
  addResident: (resident: Resident) => void;
  updateResident: (id: string, resident: Partial<Resident>) => void;
  addEvaluation: (evaluation: Evaluation) => void;
  addAppointment: (appointment: Appointment) => void;
  addSubstanceHistory: (history: SubstanceHistory) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [residents, setResidents] = useState<Resident[]>(initialResidents);
  const [evaluations, setEvaluations] = useState<Evaluation[]>(initialEvaluations);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [substanceHistory, setSubstanceHistory] = useState<SubstanceHistory[]>(initialSubstanceHistory);

  const addResident = (resident: Resident) => {
    setResidents((prev) => [resident, ...prev]);
  };

  const updateResident = (id: string, updates: Partial<Resident>) => {
    setResidents((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates, updatedAt: new Date() } : r))
    );
  };

  const addEvaluation = (evaluation: Evaluation) => {
    setEvaluations((prev) => [evaluation, ...prev]);
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [appointment, ...prev]);
  };

  const addSubstanceHistory = (history: SubstanceHistory) => {
    setSubstanceHistory((prev) => [history, ...prev]);
  };

  return (
    <DataContext.Provider
      value={{
        residents,
        evaluations,
        appointments,
        substanceHistory,
        addResident,
        updateResident,
        addEvaluation,
        addAppointment,
        addSubstanceHistory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
