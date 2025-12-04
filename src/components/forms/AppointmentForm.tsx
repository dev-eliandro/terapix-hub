import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Appointment, AppointmentType } from '@/types';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';
import { currentUser } from '@/data/mockData';

interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  residentId?: string;
}

const typeOptions: { value: AppointmentType; label: string }[] = [
  { value: 'individual', label: 'Individual' },
  { value: 'group', label: 'Grupo' },
  { value: 'clinical', label: 'Clínico' },
  { value: 'spiritual', label: 'Espiritual' },
  { value: 'family', label: 'Familiar' },
];

export function AppointmentForm({ isOpen, onClose, residentId }: AppointmentFormProps) {
  const { residents, addAppointment } = useData();

  const [formData, setFormData] = useState({
    residentId: residentId || '',
    date: new Date().toISOString().slice(0, 16),
    type: 'individual' as AppointmentType,
    objective: '',
    report: '',
    referrals: '',
    nextSteps: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.residentId || !formData.objective || !formData.report) {
      toast.error('Preencha os campos obrigatórios: Acolhido, Objetivo e Relato');
      return;
    }

    const appointment: Appointment = {
      id: crypto.randomUUID(),
      residentId: formData.residentId,
      date: new Date(formData.date),
      type: formData.type,
      professionalId: currentUser.id,
      professionalName: currentUser.name,
      objective: formData.objective,
      report: formData.report,
      referrals: formData.referrals || undefined,
      nextSteps: formData.nextSteps || undefined,
      createdAt: new Date(),
    };

    addAppointment(appointment);
    toast.success('Atendimento registrado com sucesso!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Atendimento" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-foreground">Acolhido *</label>
            <select
              name="residentId"
              value={formData.residentId}
              onChange={handleChange}
              className="input-field mt-1"
              required
            >
              <option value="">Selecione um acolhido</option>
              {residents.filter(r => r.status === 'active').map((resident) => (
                <option key={resident.id} value={resident.id}>
                  {resident.fullName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Data e Hora</label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Tipo de Atendimento</label>
            <select name="type" value={formData.type} onChange={handleChange} className="input-field mt-1">
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Objetivo do Atendimento *</label>
          <textarea
            name="objective"
            value={formData.objective}
            onChange={handleChange}
            rows={2}
            className="input-field mt-1 resize-none"
            placeholder="Qual o objetivo deste atendimento?"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Relato do Atendimento *</label>
          <textarea
            name="report"
            value={formData.report}
            onChange={handleChange}
            rows={4}
            className="input-field mt-1 resize-none"
            placeholder="Descreva o que aconteceu durante o atendimento..."
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Encaminhamentos</label>
          <textarea
            name="referrals"
            value={formData.referrals}
            onChange={handleChange}
            rows={2}
            className="input-field mt-1 resize-none"
            placeholder="Encaminhamentos realizados (se houver)..."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Próximos Passos</label>
          <textarea
            name="nextSteps"
            value={formData.nextSteps}
            onChange={handleChange}
            rows={2}
            className="input-field mt-1 resize-none"
            placeholder="O que deve ser feito na sequência?"
          />
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Registrar Atendimento
          </button>
        </div>
      </form>
    </Modal>
  );
}
