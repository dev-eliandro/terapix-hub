import { Evaluation } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { User, FileText } from 'lucide-react';

interface EvaluationCardProps {
  evaluation: Evaluation;
}

const typeLabels: Record<string, string> = {
  psychological: 'Psicológica',
  social: 'Social',
  clinical: 'Clínica',
  therapeutic: 'Terapêutica'
};

const typeColors: Record<string, string> = {
  psychological: 'bg-info/10 text-info',
  social: 'bg-success/10 text-success',
  clinical: 'bg-warning/10 text-warning',
  therapeutic: 'bg-primary/10 text-primary'
};

export function EvaluationCard({ evaluation }: EvaluationCardProps) {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-foreground">{evaluation.professionalName}</p>
            <p className="text-sm text-muted-foreground">
              {format(evaluation.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[evaluation.type]}`}>
          Avaliação {typeLabels[evaluation.type]}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-foreground">Diagnóstico</p>
        <p className="text-sm text-muted-foreground mt-1">{evaluation.diagnosis}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-foreground">Observações</p>
        <p className="text-sm text-muted-foreground mt-1">{evaluation.observations}</p>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center p-3 rounded-lg bg-muted">
          <p className="text-2xl font-bold text-primary">{evaluation.behaviorScale}</p>
          <p className="text-xs text-muted-foreground mt-1">Comportamento</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted">
          <p className="text-2xl font-bold text-primary">{evaluation.disciplineScale}</p>
          <p className="text-xs text-muted-foreground mt-1">Disciplina</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted">
          <p className="text-2xl font-bold text-primary">{evaluation.commitmentScale}</p>
          <p className="text-xs text-muted-foreground mt-1">Comprometimento</p>
        </div>
      </div>

      {evaluation.evolutionSinceLastEval && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm font-medium text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-success" />
            Evolução desde a última avaliação
          </p>
          <p className="text-sm text-muted-foreground mt-1">{evaluation.evolutionSinceLastEval}</p>
        </div>
      )}
    </div>
  );
}
