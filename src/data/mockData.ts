import {
  Resident,
  SubstanceHistory,
  Evaluation,
  Appointment,
  DashboardStats,
  User
} from '@/types';

export const currentUser: User = {
  id: '1',
  name: 'Eliandro Anjos',
  email: 'eliandrosucesso@gmail.com',
  role: 'coordinator',
  createdAt: new Date('2023-01-15')
};

export const mockResidents: Resident[] = [
  {
    id: '1',
    fullName: 'Carlos Eduardo Silva',
    cpf: '123.456.789-00',
    rg: '12.345.678-9',
    birthDate: new Date('1985-03-15'),
    gender: 'male',
    maritalStatus: 'divorced',
    education: 'Ensino Médio Completo',
    birthplace: 'São Paulo, SP',
    address: {
      street: 'Rua das Flores',
      number: '123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    emergencyContact: {
      name: 'Maria Silva',
      relationship: 'Mãe',
      phone: '(11) 98765-4321'
    },
    judicialSituation: 'Nenhuma pendência',
    admissionDate: new Date('2024-08-15'),
    expectedDischargeDate: new Date('2025-02-15'),
    status: 'active',
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-11-20')
  },
  {
    id: '2',
    fullName: 'Roberto Almeida Santos',
    cpf: '987.654.321-00',
    rg: '98.765.432-1',
    birthDate: new Date('1992-07-22'),
    gender: 'male',
    maritalStatus: 'single',
    education: 'Ensino Fundamental Incompleto',
    birthplace: 'Rio de Janeiro, RJ',
    address: {
      street: 'Av. Principal',
      number: '456',
      complement: 'Apto 12',
      neighborhood: 'Jardim América',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '20000-000'
    },
    emergencyContact: {
      name: 'José Santos',
      relationship: 'Pai',
      phone: '(21) 99876-5432'
    },
    admissionDate: new Date('2024-10-01'),
    expectedDischargeDate: new Date('2025-04-01'),
    status: 'active',
    createdAt: new Date('2024-10-01'),
    updatedAt: new Date('2024-11-28')
  },
  {
    id: '3',
    fullName: 'Fernanda Costa Lima',
    cpf: '456.789.123-00',
    rg: '45.678.912-3',
    birthDate: new Date('1988-11-30'),
    gender: 'female',
    maritalStatus: 'married',
    education: 'Ensino Superior Incompleto',
    birthplace: 'Belo Horizonte, MG',
    address: {
      street: 'Rua do Comércio',
      number: '789',
      neighborhood: 'Savassi',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30140-000'
    },
    emergencyContact: {
      name: 'Pedro Lima',
      relationship: 'Esposo',
      phone: '(31) 98888-7777'
    },
    admissionDate: new Date('2024-06-10'),
    status: 'discharged',
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-11-01')
  },
  {
    id: '4',
    fullName: 'Marcos Vinícius Oliveira',
    cpf: '321.654.987-00',
    rg: '32.165.498-7',
    birthDate: new Date('1995-02-14'),
    gender: 'male',
    maritalStatus: 'single',
    education: 'Ensino Médio Incompleto',
    birthplace: 'Curitiba, PR',
    address: {
      street: 'Av. das Araucárias',
      number: '1000',
      neighborhood: 'Batel',
      city: 'Curitiba',
      state: 'PR',
      zipCode: '80420-000'
    },
    emergencyContact: {
      name: 'Ana Oliveira',
      relationship: 'Irmã',
      phone: '(41) 99999-8888'
    },
    judicialSituation: 'Em liberdade condicional',
    admissionDate: new Date('2024-09-20'),
    expectedDischargeDate: new Date('2025-03-20'),
    status: 'active',
    createdAt: new Date('2024-09-20'),
    updatedAt: new Date('2024-12-01')
  },
  {
    id: '5',
    fullName: 'Juliana Pereira Martins',
    cpf: '654.321.987-00',
    rg: '65.432.198-7',
    birthDate: new Date('1990-06-08'),
    gender: 'female',
    maritalStatus: 'divorced',
    education: 'Ensino Superior Completo',
    birthplace: 'Porto Alegre, RS',
    address: {
      street: 'Rua da Redenção',
      number: '555',
      neighborhood: 'Cidade Baixa',
      city: 'Porto Alegre',
      state: 'RS',
      zipCode: '90050-000'
    },
    emergencyContact: {
      name: 'Regina Martins',
      relationship: 'Mãe',
      phone: '(51) 98765-1234'
    },
    admissionDate: new Date('2024-07-05'),
    status: 'evaded',
    createdAt: new Date('2024-07-05'),
    updatedAt: new Date('2024-10-15')
  }
];

export const mockSubstanceHistory: SubstanceHistory[] = [
  {
    id: '1',
    residentId: '1',
    substance: 'alcohol',
    startAge: 16,
    durationYears: 23,
    frequency: 'daily',
    lastUseDate: new Date('2024-08-14'),
    consumptionMethod: 'oral',
    isPolyUser: true,
    relapseHistory: '3 recaídas anteriores, a última em 2023',
    previousHospitalizations: 2,
    treatmentAttempts: 3,
    physicalImpacts: 'Problemas hepáticos, gastrite crônica',
    socialImpacts: 'Perda de emprego, isolamento social',
    familyImpacts: 'Divórcio, afastamento dos filhos',
    createdAt: new Date('2024-08-15')
  },
  {
    id: '2',
    residentId: '1',
    substance: 'cocaine',
    startAge: 22,
    durationYears: 17,
    frequency: 'weekly',
    lastUseDate: new Date('2024-08-10'),
    consumptionMethod: 'snorted',
    isPolyUser: true,
    relapseHistory: '2 recaídas relacionadas ao uso de cocaína',
    previousHospitalizations: 1,
    treatmentAttempts: 2,
    physicalImpacts: 'Desvio de septo, problemas cardíacos leves',
    socialImpacts: 'Dívidas financeiras, perda de amizades',
    familyImpacts: 'Conflitos familiares intensos',
    createdAt: new Date('2024-08-15')
  },
  {
    id: '3',
    residentId: '2',
    substance: 'crack',
    startAge: 18,
    durationYears: 14,
    frequency: 'daily',
    lastUseDate: new Date('2024-09-30'),
    consumptionMethod: 'smoked',
    isPolyUser: false,
    relapseHistory: '5 recaídas em tratamentos anteriores',
    previousHospitalizations: 4,
    treatmentAttempts: 5,
    physicalImpacts: 'Problemas respiratórios, perda de peso severa',
    socialImpacts: 'Situação de rua por 2 anos',
    familyImpacts: 'Rompimento total com a família',
    createdAt: new Date('2024-10-01')
  }
];

export const mockEvaluations: Evaluation[] = [
  {
    id: '1',
    residentId: '1',
    date: new Date('2024-11-15'),
    professionalId: '2',
    professionalName: 'Dra. Patrícia Mendes',
    type: 'psychological',
    diagnosis: 'Transtorno por uso de álcool em remissão inicial',
    observations: 'Paciente apresenta boa adesão ao tratamento. Demonstra motivação para mudança e consciência sobre os danos causados pelo uso.',
    behaviorScale: 8,
    disciplineScale: 7,
    commitmentScale: 9,
    evolutionSinceLastEval: 'Melhora significativa no controle emocional e nas relações interpessoais',
    createdAt: new Date('2024-11-15')
  },
  {
    id: '2',
    residentId: '1',
    date: new Date('2024-10-15'),
    professionalId: '3',
    professionalName: 'Assistente Social Maria Clara',
    type: 'social',
    diagnosis: 'Vínculos familiares fragilizados em processo de reconstrução',
    observations: 'Família demonstra interesse em participar do processo de recuperação. Filhos ainda resistentes ao contato.',
    behaviorScale: 7,
    disciplineScale: 7,
    commitmentScale: 8,
    evolutionSinceLastEval: 'Primeiro contato telefônico com os filhos realizado com sucesso',
    createdAt: new Date('2024-10-15')
  },
  {
    id: '3',
    residentId: '2',
    date: new Date('2024-11-20'),
    professionalId: '2',
    professionalName: 'Dra. Patrícia Mendes',
    type: 'psychological',
    diagnosis: 'Transtorno por uso de crack - fase inicial de tratamento',
    observations: 'Paciente ainda apresenta fissura intensa. Necessita acompanhamento intensivo.',
    behaviorScale: 5,
    disciplineScale: 6,
    commitmentScale: 6,
    evolutionSinceLastEval: 'Estabilização do quadro agudo. Início de participação em grupos',
    createdAt: new Date('2024-11-20')
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    residentId: '1',
    date: new Date('2024-12-02T10:00:00'),
    type: 'individual',
    professionalId: '2',
    professionalName: 'Dra. Patrícia Mendes',
    objective: 'Trabalhar estratégias de prevenção de recaída',
    report: 'Sessão produtiva. Paciente identificou gatilhos principais e desenvolveu plano de enfrentamento.',
    referrals: 'Encaminhado para grupo de prevenção de recaída',
    nextSteps: 'Continuar trabalho com técnicas de mindfulness',
    createdAt: new Date('2024-12-02')
  },
  {
    id: '2',
    residentId: '1',
    date: new Date('2024-11-28T14:00:00'),
    type: 'group',
    professionalId: '1',
    professionalName: 'Dr. Ana Beatriz',
    objective: 'Grupo terapêutico - compartilhamento de experiências',
    report: 'Paciente participou ativamente, compartilhando sua história e oferecendo suporte aos colegas.',
    nextSteps: 'Manter participação semanal no grupo',
    createdAt: new Date('2024-11-28')
  },
  {
    id: '3',
    residentId: '2',
    date: new Date('2024-12-01T09:00:00'),
    type: 'clinical',
    professionalId: '4',
    professionalName: 'Dr. Ricardo Souza',
    objective: 'Avaliação clínica mensal',
    report: 'Exames laboratoriais dentro da normalidade. Ganho de peso de 3kg. Pressão arterial estável.',
    referrals: 'Solicitado exame de função pulmonar',
    nextSteps: 'Retorno em 30 dias',
    createdAt: new Date('2024-12-01')
  },
  {
    id: '4',
    residentId: '4',
    date: new Date('2024-12-03T11:00:00'),
    type: 'spiritual',
    professionalId: '5',
    professionalName: 'Pastor João',
    objective: 'Acompanhamento espiritual semanal',
    report: 'Paciente demonstra busca por espiritualidade como suporte na recuperação.',
    nextSteps: 'Continuar acompanhamento semanal',
    createdAt: new Date('2024-12-03')
  }
];

export const mockDashboardStats: DashboardStats = {
  totalResidents: 5,
  activeResidents: 3,
  dischargedThisMonth: 0,
  pendingEvaluations: 4,
  appointmentsThisWeek: 12,
  averageStayDays: 95
};
