import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { SubstanceTimeline } from '@/components/residents/SubstanceTimeline';
import { EvaluationCard } from '@/components/residents/EvaluationCard';
import { AppointmentCard } from '@/components/residents/AppointmentCard';
import { ResidentForm } from '@/components/forms/ResidentForm';
import { EvaluationForm } from '@/components/forms/EvaluationForm';
import { AppointmentForm } from '@/components/forms/AppointmentForm';
import { useData } from '@/contexts/DataContext';
import { format, differenceInYears, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  Phone,
  FileText,
  ClipboardList,
  Activity,
  Edit,
  Printer,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'info', label: 'Informações', icon: User },
  { id: 'substances', label: 'Histórico de SPA', icon: Activity },
  { id: 'evaluations', label: 'Avaliações', icon: ClipboardList },
  { id: 'appointments', label: 'Atendimentos', icon: Calendar }
];

const statusConfig = {
  active: { label: 'Ativo', className: 'status-active' },
  discharged: { label: 'Alta Terapêutica', className: 'status-discharged' },
  evaded: { label: 'Evasão', className: 'status-evaded' },
  terminated: { label: 'Desligado', className: 'status-terminated' }
};

export default function ResidentDetail() {
  const { id } = useParams<{ id: string }>();
  const { residents, evaluations, appointments, substanceHistory } = useData();
  const [activeTab, setActiveTab] = useState('info');
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isEvaluationFormOpen, setIsEvaluationFormOpen] = useState(false);
  const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false);

  const resident = residents.find((r) => r.id === id);
  const residentSubstanceHistory = substanceHistory.filter((h) => h.residentId === id);
  const residentEvaluations = evaluations.filter((e) => e.residentId === id);
  const residentAppointments = appointments.filter((a) => a.residentId === id);

  if (!resident) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-foreground">Acolhido não encontrado</h2>
          <Link to="/residents" className="text-primary hover:underline mt-4 inline-block">
            ← Voltar para lista
          </Link>
        </div>
      </MainLayout>
    );
  }

  const status = statusConfig[resident.status];
  const age = differenceInYears(new Date(), resident.birthDate);
  const daysInTreatment = differenceInDays(new Date(), resident.admissionDate);

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-6">
          <Link
            to="/residents"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para lista
          </Link>

          <div className="card-elevated p-6">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl flex-shrink-0">
                {resident.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{resident.fullName}</h1>
                    <p className="text-muted-foreground mt-1">
                      {age} anos • CPF: {resident.cpf}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn('status-badge', status.className)}>{status.label}</span>
                    <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                      <Printer className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <button className="btn-primary" onClick={() => setIsEditFormOpen(true)}>
                      <Edit className="h-4 w-4" />
                      Editar
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Admissão:</span>
                    <span className="font-medium">{format(resident.admissionDate, 'dd/MM/yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Em tratamento:</span>
                    <span className="font-medium text-primary">{daysInTreatment} dias</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Origem:</span>
                    <span className="font-medium">{resident.birthplace}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Emergência:</span>
                    <span className="font-medium">{resident.emergencyContact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <nav className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.id === 'evaluations' && residentEvaluations.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                    {residentEvaluations.length}
                  </span>
                )}
                {tab.id === 'appointments' && residentAppointments.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                    {residentAppointments.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'info' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Dados Pessoais
                </h3>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm text-muted-foreground">RG</dt>
                    <dd className="font-medium">{resident.rg}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Data de Nascimento</dt>
                    <dd className="font-medium">
                      {format(resident.birthDate, "dd/MM/yyyy", { locale: ptBR })}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Sexo</dt>
                    <dd className="font-medium">
                      {resident.gender === 'male' ? 'Masculino' : resident.gender === 'female' ? 'Feminino' : 'Outro'}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Estado Civil</dt>
                    <dd className="font-medium">
                      {resident.maritalStatus === 'single' && 'Solteiro(a)'}
                      {resident.maritalStatus === 'married' && 'Casado(a)'}
                      {resident.maritalStatus === 'divorced' && 'Divorciado(a)'}
                      {resident.maritalStatus === 'widowed' && 'Viúvo(a)'}
                      {resident.maritalStatus === 'stable_union' && 'União Estável'}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-sm text-muted-foreground">Escolaridade</dt>
                    <dd className="font-medium">{resident.education}</dd>
                  </div>
                </dl>
              </div>

              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Endereço
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-muted-foreground">Logradouro</dt>
                    <dd className="font-medium">
                      {resident.address.street}, {resident.address.number}
                      {resident.address.complement && ` - ${resident.address.complement}`}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Bairro</dt>
                    <dd className="font-medium">{resident.address.neighborhood}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Cidade/Estado</dt>
                    <dd className="font-medium">
                      {resident.address.city} - {resident.address.state}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">CEP</dt>
                    <dd className="font-medium">{resident.address.zipCode}</dd>
                  </div>
                </dl>
              </div>

              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contato de Emergência
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-muted-foreground">Nome</dt>
                    <dd className="font-medium">{resident.emergencyContact.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Parentesco</dt>
                    <dd className="font-medium">{resident.emergencyContact.relationship}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Telefone</dt>
                    <dd className="font-medium">{resident.emergencyContact.phone}</dd>
                  </div>
                </dl>
              </div>

              <div className="card-elevated p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Situação no Programa
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-muted-foreground">Data de Admissão</dt>
                    <dd className="font-medium">
                      {format(resident.admissionDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </dd>
                  </div>
                  {resident.expectedDischargeDate && (
                    <div>
                      <dt className="text-sm text-muted-foreground">Previsão de Alta</dt>
                      <dd className="font-medium">
                        {format(resident.expectedDischargeDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </dd>
                    </div>
                  )}
                  {resident.judicialSituation && (
                    <div>
                      <dt className="text-sm text-muted-foreground">Situação Judicial</dt>
                      <dd className="font-medium">{resident.judicialSituation}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}

          {activeTab === 'substances' && <SubstanceTimeline history={residentSubstanceHistory} />}

          {activeTab === 'evaluations' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button className="btn-primary" onClick={() => setIsEvaluationFormOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Nova Avaliação
                </button>
              </div>
              {residentEvaluations.length > 0 ? (
                residentEvaluations.map((evaluation, index) => (
                  <div
                    key={evaluation.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <EvaluationCard evaluation={evaluation} />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma avaliação registrada.
                </div>
              )}
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button className="btn-primary" onClick={() => setIsAppointmentFormOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Novo Atendimento
                </button>
              </div>
              {residentAppointments.length > 0 ? (
                residentAppointments.map((appointment, index) => (
                  <div
                    key={appointment.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <AppointmentCard appointment={appointment} />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum atendimento registrado.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Form Modals */}
        <ResidentForm isOpen={isEditFormOpen} onClose={() => setIsEditFormOpen(false)} resident={resident} />
        <EvaluationForm isOpen={isEvaluationFormOpen} onClose={() => setIsEvaluationFormOpen(false)} residentId={id} />
        <AppointmentForm isOpen={isAppointmentFormOpen} onClose={() => setIsAppointmentFormOpen(false)} residentId={id} />
      </div>
    </MainLayout>
  );
}
