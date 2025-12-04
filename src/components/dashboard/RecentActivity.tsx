import { useData } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, User } from 'lucide-react';

export function RecentActivity() {
  const { appointments, residents } = useData();
  
  const recentAppointments = [...appointments]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return (
    <div className="card-elevated p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Atividades Recentes
      </h3>
      <div className="space-y-4">
        {recentAppointments.map((appointment) => {
          const resident = residents.find(r => r.id === appointment.residentId);
          return (
            <div
              key={appointment.id}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Calendar className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {appointment.type === 'individual' && 'Atendimento Individual'}
                  {appointment.type === 'group' && 'Grupo Terapêutico'}
                  {appointment.type === 'clinical' && 'Avaliação Clínica'}
                  {appointment.type === 'spiritual' && 'Acompanhamento Espiritual'}
                  {appointment.type === 'family' && 'Atendimento Familiar'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground truncate">
                    {resident?.fullName}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(appointment.date, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
          );
        })}
        {recentAppointments.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhuma atividade recente
          </p>
        )}
      </div>
    </div>
  );
}
