import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ResidentCard } from '@/components/residents/ResidentCard';
import { mockResidents } from '@/data/mockData';
import { Search, Filter, Plus, Users } from 'lucide-react';
import { AccommodationStatus } from '@/types';

const statusFilters: { value: AccommodationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativos' },
  { value: 'discharged', label: 'Alta Terapêutica' },
  { value: 'evaded', label: 'Evasão' },
  { value: 'terminated', label: 'Desligados' }
];

export default function Residents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AccommodationStatus | 'all'>('all');

  const filteredResidents = mockResidents.filter((resident) => {
    const matchesSearch =
      resident.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.cpf.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || resident.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Acolhidos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os acolhidos da comunidade terapêutica
            </p>
          </div>
          <button className="btn-primary">
            <Plus className="h-5 w-5" />
            Novo Acolhido
          </button>
        </div>

        {/* Filters */}
        <div className="card-elevated p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nome ou CPF..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-5 w-5 text-muted-foreground" />
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    statusFilter === filter.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{filteredResidents.length} acolhido(s) encontrado(s)</span>
        </div>

        {/* Residents Grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredResidents.map((resident, index) => (
            <div
              key={resident.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ResidentCard resident={resident} />
            </div>
          ))}
        </div>

        {filteredResidents.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">Nenhum acolhido encontrado</h3>
            <p className="text-muted-foreground mt-1">
              Tente ajustar os filtros ou termos de busca
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
