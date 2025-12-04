import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AppointmentCard } from '@/components/residents/AppointmentCard';
import { AppointmentForm } from '@/components/forms/AppointmentForm';
import { useData } from '@/contexts/DataContext';
import { Plus, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Appointments() {
  const { appointments, residents } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const appointmentsWithResident = appointments.map((appointment) => ({
    ...appointment,
    resident: residents.find((r) => r.id === appointment.residentId)
  }));

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Atendimentos</h1>
            <p className="text-muted-foreground mt-1">
              Registros de atendimentos terapêuticos
            </p>
          </div>
          <button className="btn-primary" onClick={() => setIsFormOpen(true)}>
            <Plus className="h-5 w-5" />
            Novo Atendimento
          </button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointmentsWithResident.map((appointment, index) => (
            <div
              key={appointment.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card-elevated p-4 mb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>Acolhido:</span>
                  <Link
                    to={`/residents/${appointment.residentId}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {appointment.resident?.fullName}
                  </Link>
                </div>
              </div>
              <AppointmentCard appointment={appointment} />
            </div>
          ))}
        </div>

        {appointmentsWithResident.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">Nenhum atendimento encontrado</h3>
            <p className="text-muted-foreground mt-1">
              Comece registrando um novo atendimento
            </p>
          </div>
        )}

        {/* Form Modal */}
        <AppointmentForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      </div>
    </MainLayout>
  );
}
