import { Appointment } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Clock, User, Target, ArrowRight } from 'lucide-react';

interface AppointmentCardProps {
  appointment: Appointment;
}

const typeConfig: Record<string, { label: string; color: string }> = {
  individual: { label: 'Individual', color: 'bg-primary/10 text-primary' },
  group: { label: 'Grupo', color: 'bg-info/10 text-info' },
  spiritual: { label: 'Espiritual', color: 'bg-warning/10 text-warning' },
  clinical: { label: 'Clínico', color: 'bg-success/10 text-success' },
  family: { label: 'Familiar', color: 'bg-accent/10 text-accent' }
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  const type = typeConfig[appointment.type];

  return (
    <div className="card-elevated p-5">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {format(appointment.date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{appointment.professionalName}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${type.color}`}>
          {type.label}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Target className="h-4 w-4 text-primary" />
          Objetivo
        </div>
        <p className="text-sm text-muted-foreground mt-1">{appointment.objective}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-foreground">Relato do Atendimento</p>
        <p className="text-sm text-muted-foreground mt-1">{appointment.report}</p>
      </div>

      {(appointment.referrals || appointment.nextSteps) && (
        <div className="mt-4 pt-4 border-t border-border grid md:grid-cols-2 gap-4">
          {appointment.referrals && (
            <div>
              <p className="text-sm font-medium text-foreground">Encaminhamentos</p>
              <p className="text-sm text-muted-foreground mt-1">{appointment.referrals}</p>
            </div>
          )}
          {appointment.nextSteps && (
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-success" />
                Próximos Passos
              </p>
              <p className="text-sm text-muted-foreground mt-1">{appointment.nextSteps}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
