import { Resident } from '@/types';
import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, MapPin, Phone, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ResidentCardProps {
  resident: Resident;
}

const statusConfig = {
  active: { label: 'Ativo', className: 'status-active' },
  discharged: { label: 'Alta Terapêutica', className: 'status-discharged' },
  evaded: { label: 'Evasão', className: 'status-evaded' },
  terminated: { label: 'Desligado', className: 'status-terminated' }
};

export function ResidentCard({ resident }: ResidentCardProps) {
  const status = statusConfig[resident.status];
  const daysInTreatment = differenceInDays(new Date(), resident.admissionDate);

  return (
    <Link
      to={`/residents/${resident.id}`}
      className="card-elevated p-5 block group hover:shadow-elevated transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
            {resident.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {resident.fullName}
            </h3>
            <p className="text-sm text-muted-foreground">CPF: {resident.cpf}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn('status-badge', status.className)}>
            {status.label}
          </span>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Admissão: {format(resident.admissionDate, "dd/MM/yyyy", { locale: ptBR })}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{resident.address.city}, {resident.address.state}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{resident.emergencyContact.phone}</span>
        </div>
      </div>

      {resident.status === 'active' && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Tempo em tratamento</span>
            <span className="font-medium text-primary">{daysInTreatment} dias</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${Math.min((daysInTreatment / 180) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
    </Link>
  );
}
