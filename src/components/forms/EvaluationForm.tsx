import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Evaluation, EvaluationType } from '@/types';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';
import { currentUser } from '@/data/mockData';

interface EvaluationFormProps {
  isOpen: boolean;
  onClose: () => void;
  residentId?: string;
}

const typeOptions: { value: EvaluationType; label: string }[] = [
  { value: 'psychological', label: 'Psicológica' },
  { value: 'social', label: 'Social' },
  { value: 'clinical', label: 'Clínica' },
  { value: 'therapeutic', label: 'Terapêutica' },
];

export function EvaluationForm({ isOpen, onClose, residentId }: EvaluationFormProps) {
  const { residents, addEvaluation } = useData();

  const [formData, setFormData] = useState({
    residentId: residentId || '',
    date: new Date().toISOString().split('T')[0],
    type: 'psychological' as EvaluationType,
    diagnosis: '',
    observations: '',
    behaviorScale: 5,
    disciplineScale: 5,
    commitmentScale: 5,
    evolutionSinceLastEval: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'range' ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.residentId || !formData.diagnosis) {
      toast.error('Preencha os campos obrigatórios: Acolhido e Diagnóstico');
      return;
    }

    const evaluation: Evaluation = {
      id: crypto.randomUUID(),
      residentId: formData.residentId,
      date: new Date(formData.date),
      professionalId: currentUser.id,
      professionalName: currentUser.name,
      type: formData.type,
      diagnosis: formData.diagnosis,
      observations: formData.observations,
      behaviorScale: formData.behaviorScale,
      disciplineScale: formData.disciplineScale,
      commitmentScale: formData.commitmentScale,
      evolutionSinceLastEval: formData.evolutionSinceLastEval,
      createdAt: new Date(),
    };

    addEvaluation(evaluation);
    toast.success('Avaliação registrada com sucesso!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Avaliação" size="lg">
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
            <label className="text-sm font-medium text-foreground">Data da Avaliação</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Tipo de Avaliação</label>
            <select name="type" value={formData.type} onChange={handleChange} className="input-field mt-1">
              {typeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Diagnóstico / Impressão *</label>
          <textarea
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            rows={3}
            className="input-field mt-1 resize-none"
            placeholder="Descreva o diagnóstico ou impressão clínica..."
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Observações</label>
          <textarea
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            rows={3}
            className="input-field mt-1 resize-none"
            placeholder="Observações adicionais..."
          />
        </div>

        {/* Escalas */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-4">Escalas de Avaliação (1-10)</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Comportamento</span>
                <span className="font-semibold text-primary">{formData.behaviorScale}</span>
              </div>
              <input
                type="range"
                name="behaviorScale"
                min="1"
                max="10"
                value={formData.behaviorScale}
                onChange={handleChange}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Disciplina</span>
                <span className="font-semibold text-primary">{formData.disciplineScale}</span>
              </div>
              <input
                type="range"
                name="disciplineScale"
                min="1"
                max="10"
                value={formData.disciplineScale}
                onChange={handleChange}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Comprometimento</span>
                <span className="font-semibold text-primary">{formData.commitmentScale}</span>
              </div>
              <input
                type="range"
                name="commitmentScale"
                min="1"
                max="10"
                value={formData.commitmentScale}
                onChange={handleChange}
                className="w-full accent-primary"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground">Evolução desde a Última Avaliação</label>
          <textarea
            name="evolutionSinceLastEval"
            value={formData.evolutionSinceLastEval}
            onChange={handleChange}
            rows={2}
            className="input-field mt-1 resize-none"
            placeholder="Descreva a evolução observada..."
          />
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Registrar Avaliação
          </button>
        </div>
      </form>
    </Modal>
  );
}
