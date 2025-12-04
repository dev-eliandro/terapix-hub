import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ResidentStatusChart } from '@/components/dashboard/ResidentStatusChart';
import { mockDashboardStats, mockResidents } from '@/data/mockData';
import { Users, UserCheck, Calendar, ClipboardList, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Index = () => {
  const activeResidents = mockResidents.filter(r => r.status === 'active').slice(0, 4);

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Bem-vindo ao sistema de gestão da Comunidade Terapêutica Renascer
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
          <StatCard
            title="Total de Acolhidos"
            value={mockDashboardStats.totalResidents}
            icon={<Users className="h-6 w-6" />}
          />
          <StatCard
            title="Ativos"
            value={mockDashboardStats.activeResidents}
            icon={<UserCheck className="h-6 w-6" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Altas no Mês"
            value={mockDashboardStats.dischargedThisMonth}
            icon={<TrendingUp className="h-6 w-6" />}
          />
          <StatCard
            title="Avaliações Pendentes"
            value={mockDashboardStats.pendingEvaluations}
            icon={<ClipboardList className="h-6 w-6" />}
          />
          <StatCard
            title="Atendimentos/Semana"
            value={mockDashboardStats.appointmentsThisWeek}
            icon={<Calendar className="h-6 w-6" />}
          />
          <StatCard
            title="Média de Permanência"
            value={`${mockDashboardStats.averageStayDays}d`}
            icon={<Clock className="h-6 w-6" />}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <ResidentStatusChart />
          <RecentActivity />
        </div>

        {/* Active Residents Quick View */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Acolhidos Ativos</h3>
            <Link
              to="/residents"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Ver todos →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="table-header pb-3">Nome</th>
                  <th className="table-header pb-3">Data de Admissão</th>
                  <th className="table-header pb-3">Tempo em Tratamento</th>
                  <th className="table-header pb-3">Previsão de Alta</th>
                  <th className="table-header pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {activeResidents.map((resident) => (
                  <tr key={resident.id} className="hover:bg-muted/50 transition-colors">
                    <td className="table-cell">
                      <Link
                        to={`/residents/${resident.id}`}
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {resident.fullName}
                      </Link>
                    </td>
                    <td className="table-cell text-muted-foreground">
                      {format(resident.admissionDate, "dd/MM/yyyy", { locale: ptBR })}
                    </td>
                    <td className="table-cell text-muted-foreground">
                      {differenceInDays(new Date(), resident.admissionDate)} dias
                    </td>
                    <td className="table-cell text-muted-foreground">
                      {resident.expectedDischargeDate
                        ? format(resident.expectedDischargeDate, "dd/MM/yyyy", { locale: ptBR })
                        : '-'}
                    </td>
                    <td className="table-cell">
                      <span className="status-badge status-active">Ativo</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
