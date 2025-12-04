import { SubstanceHistory } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AlertTriangle, Clock, Activity } from 'lucide-react';

interface SubstanceTimelineProps {
  history: SubstanceHistory[];
}

const substanceLabels: Record<string, string> = {
  alcohol: 'Álcool',
  cocaine: 'Cocaína',
  crack: 'Crack',
  marijuana: 'Maconha',
  methamphetamine: 'Metanfetamina',
  heroin: 'Heroína',
  lsd: 'LSD',
  ecstasy: 'Ecstasy',
  inhalants: 'Inalantes',
  prescription_drugs: 'Medicamentos',
  other: 'Outras'
};

const frequencyLabels: Record<string, string> = {
  daily: 'Diário',
  weekly: 'Semanal',
  monthly: 'Mensal',
  occasional: 'Ocasional',
  sporadic: 'Esporádico'
};

const consumptionLabels: Record<string, string> = {
  oral: 'Oral',
  smoked: 'Fumado',
  snorted: 'Aspirado',
  injected: 'Injetado',
  inhaled: 'Inalado'
};

export function SubstanceTimeline({ history }: SubstanceTimelineProps) {
  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum histórico de substâncias registrado.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {history.map((item, index) => (
        <div key={item.id} className="relative">
          {index < history.length - 1 && (
            <div className="absolute left-[1.375rem] top-12 bottom-0 w-0.5 bg-border" />
          )}
          
          <div className="flex gap-4">
            <div className="relative z-10">
              <div className="h-11 w-11 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
            </div>
            
            <div className="flex-1 card-elevated p-5">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h4 className="font-semibold text-foreground text-lg">
                    {substanceLabels[item.substance]}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Início aos {item.startAge} anos • {item.durationYears} anos de uso
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
                    {frequencyLabels[item.frequency]}
                  </span>
                  {item.isPolyUser && (
                    <span className="px-3 py-1 rounded-full bg-warning/10 text-warning text-sm font-medium">
                      Poliusuário
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Último uso:</span>
                    <span className="font-medium text-foreground">
                      {format(item.lastUseDate, "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Forma de consumo:</span>
                    <span className="font-medium text-foreground">
                      {consumptionLabels[item.consumptionMethod]}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Internações anteriores:</span>
                    <span className="font-medium text-foreground ml-2">{item.previousHospitalizations}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Tentativas de tratamento:</span>
                    <span className="font-medium text-foreground ml-2">{item.treatmentAttempts}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Histórico de Recaídas</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.relapseHistory}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Impactos Físicos</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.physicalImpacts}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Impactos Sociais</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.socialImpacts}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Impactos Familiares</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.familyImpacts}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
