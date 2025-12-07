import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Heart,
  LogOut,
  Shield,
  UserCog
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth, AppRole } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Acolhidos', href: '/residents', icon: Users },
  { name: 'Avaliações', href: '/evaluations', icon: ClipboardList },
  { name: 'Atendimentos', href: '/appointments', icon: Calendar },
  { name: 'Relatórios', href: '/reports', icon: FileText },
  { name: 'Usuários', href: '/users', icon: UserCog, adminOnly: true },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

const roleLabels: Record<AppRole, string> = {
  admin: 'Administrador',
  coordinator: 'Coordenador',
  therapist: 'Terapeuta',
  psychologist: 'Psicólogo',
  viewer: 'Visualização',
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { profile, role, signOut } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
      style={{ background: 'var(--gradient-sidebar)' }}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <Heart className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-lg font-semibold text-sidebar-foreground">
                CETES
              </span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            // Hide admin-only items for non-admins
            if ('adminOnly' in item && item.adminOnly && role !== 'admin') {
              return null;
            }
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'nav-link',
                  isActive && 'active',
                  collapsed && 'justify-center px-3'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-sidebar-border p-4">
          <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-medium text-sm">
              {profile?.full_name ? getInitials(profile.full_name) : '?'}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {profile?.full_name || 'Usuário'}
                </p>
                {role && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <Shield className="h-3 w-3 text-sidebar-foreground/60" />
                    <p className="text-xs text-sidebar-foreground/60 truncate">
                      {roleLabels[role]}
                    </p>
                  </div>
                )}
              </div>
            )}
            {!collapsed && (
              <button 
                onClick={signOut}
                className="rounded-lg p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
