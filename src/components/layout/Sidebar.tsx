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
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/data/mockData';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Acolhidos', href: '/residents', icon: Users },
  { name: 'Avaliações', href: '/evaluations', icon: ClipboardList },
  { name: 'Atendimentos', href: '/appointments', icon: Calendar },
  { name: 'Relatórios', href: '/reports', icon: FileText },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

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
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-medium">
              {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {currentUser.name}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  Coordenador Técnico
                </p>
              </div>
            )}
            {!collapsed && (
              <button className="rounded-lg p-1.5 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
