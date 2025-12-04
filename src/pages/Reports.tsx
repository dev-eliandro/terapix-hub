import { MainLayout } from '@/components/layout/MainLayout';
import { mockDashboardStats, mockResidents, mockAppointments, mockEvaluations } from '@/data/mockData';
import { FileText, Download, Users, Calendar, ClipboardList, TrendingUp } from 'lucide-react';

const reportTypes = [
  {
    id: 'evolution',
    title: 'Evolução Individual',
    description: 'Relatório completo de evolução do acolhido',
    icon: TrendingUp,
    available: true
  },
  {
    id: 'history',
    title: 'Histórico por Período',
    description: 'Histórico de atividades em período específico',
    icon: Calendar,
    available: true
  },
  {
    id: 'appointments',
    title: 'Atendimentos por Profissional',
    description: 'Relatório de atendimentos realizados',
    icon: ClipboardList,
    available: true
  },
  {
    id: 'pending',
    title: 'Avaliações Pendentes',
    description: 'Lista de avaliações a serem realizadas',
    icon: FileText,
    available: true
  },
  {
    id: 'indicators',
    title: 'Indicadores Terapêuticos',
    description: 'Métricas e indicadores de evolução',
    icon: TrendingUp,
    available: true
  },
  {
    id: 'census',
    title: 'Censo Atual',
    description: 'Relatório do censo atual da comunidade',
    icon: Users,
    available: true
  }
];

export default function Reports() {
  const activeResidents = mockResidents.filter((r) => r.status === 'active').length;

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground mt-1">
            Gere relatórios e exporte dados do sistema
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="card-elevated p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeResidents}</p>
              <p className="text-sm text-muted-foreground">Acolhidos Ativos</p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-info/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockAppointments.length}</p>
              <p className="text-sm text-muted-foreground">Total Atendimentos</p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
              <ClipboardList className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockEvaluations.length}</p>
              <p className="text-sm text-muted-foreground">Avaliações Realizadas</p>
            </div>
          </div>
          <div className="card-elevated p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{mockDashboardStats.averageStayDays}d</p>
              <p className="text-sm text-muted-foreground">Média Permanência</p>
            </div>
          </div>
        </div>

        {/* Report Types */}
        <h2 className="text-xl font-semibold text-foreground mb-4">Tipos de Relatório</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((report, index) => (
            <div
              key={report.id}
              className="card-elevated p-6 hover:shadow-elevated transition-all duration-300 animate-slide-up group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <report.icon className="h-6 w-6" />
                </div>
                <button className="btn-primary text-sm py-2 px-4">
                  <Download className="h-4 w-4" />
                  Gerar
                </button>
              </div>
              <h3 className="text-lg font-semibold text-foreground mt-4">{report.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">PDF</span>
                <span className="px-2 py-1 rounded text-xs bg-muted text-muted-foreground">Excel</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
