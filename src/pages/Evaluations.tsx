import { MainLayout } from '@/components/layout/MainLayout';
import { EvaluationCard } from '@/components/residents/EvaluationCard';
import { mockEvaluations, mockResidents } from '@/data/mockData';
import { Plus, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Evaluations() {
  const evaluationsWithResident = mockEvaluations.map((evaluation) => ({
    ...evaluation,
    resident: mockResidents.find((r) => r.id === evaluation.residentId)
  }));

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Avaliações</h1>
            <p className="text-muted-foreground mt-1">
              Avaliações periódicas dos acolhidos
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="h-5 w-5" />
            Nova Avaliação
          </button>
        </div>

        {/* Evaluations List */}
        <div className="space-y-4">
          {evaluationsWithResident.map((evaluation, index) => (
            <div
              key={evaluation.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="card-elevated p-4 mb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <ClipboardList className="h-4 w-4" />
                  <span>Acolhido:</span>
                  <Link
                    to={`/residents/${evaluation.residentId}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {evaluation.resident?.fullName}
                  </Link>
                </div>
              </div>
              <EvaluationCard evaluation={evaluation} />
            </div>
          ))}
        </div>

        {evaluationsWithResident.length === 0 && (
          <div className="text-center py-12">
            <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">Nenhuma avaliação encontrada</h3>
            <p className="text-muted-foreground mt-1">
              Comece criando uma nova avaliação
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
