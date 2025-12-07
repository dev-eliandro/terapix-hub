import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth, AppRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Shield, Users as UsersIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface UserWithRole {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  role: AppRole;
  role_id: string;
}

const roleLabels: Record<AppRole, string> = {
  admin: 'Administrador',
  coordinator: 'Coordenador',
  therapist: 'Terapeuta',
  psychologist: 'Psicólogo',
  viewer: 'Visualização',
};

const roleColors: Record<AppRole, string> = {
  admin: 'bg-red-500/10 text-red-600 border-red-500/20',
  coordinator: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  therapist: 'bg-green-500/10 text-green-600 border-green-500/20',
  psychologist: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  viewer: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const { user: currentUser } = useAuth();
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);

      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        throw profilesError;
      }

      // Fetch roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) {
        throw rolesError;
      }

      // Combine profiles with roles
      const usersWithRoles: UserWithRole[] = (profiles || []).map((profile) => {
        const userRole = roles?.find((r) => r.user_id === profile.user_id);
        return {
          id: profile.id,
          user_id: profile.user_id,
          full_name: profile.full_name,
          email: profile.email,
          avatar_url: profile.avatar_url,
          created_at: profile.created_at,
          role: (userRole?.role as AppRole) || 'viewer',
          role_id: userRole?.id || '',
        };
      });

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os usuários.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, roleId: string, newRole: AppRole) => {
    if (userId === currentUser?.id) {
      toast({
        title: 'Ação não permitida',
        description: 'Você não pode alterar seu próprio cargo.',
        variant: 'destructive',
      });
      return;
    }

    setUpdatingUserId(userId);

    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('id', roleId);

      if (error) {
        throw error;
      }

      setUsers((prev) =>
        prev.map((u) => (u.user_id === userId ? { ...u, role: newRole } : u))
      );

      toast({
        title: 'Cargo atualizado',
        description: `O cargo foi alterado para ${roleLabels[newRole]}.`,
      });
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o cargo.',
        variant: 'destructive',
      });
    } finally {
      setUpdatingUserId(null);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <UsersIcon className="h-7 w-7 text-primary" />
              Gerenciamento de Usuários
            </h1>
            <p className="text-muted-foreground mt-1">
              Gerencie os usuários e seus cargos no sistema
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-5">
          {Object.entries(roleLabels).map(([role, label]) => {
            const count = users.filter((u) => u.role === role).length;
            return (
              <Card key={role}>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    {label}
                  </CardDescription>
                  <CardTitle className="text-2xl">{count}</CardTitle>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Usuários Cadastrados</CardTitle>
                <CardDescription>
                  {users.length} usuário{users.length !== 1 ? 's' : ''} no sistema
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                {searchQuery
                  ? 'Nenhum usuário encontrado com esses critérios.'
                  : 'Nenhum usuário cadastrado.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Cargo</TableHead>
                      <TableHead>Cadastro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src={user.avatar_url || undefined} />
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {getInitials(user.full_name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.full_name}</p>
                              {user.user_id === currentUser?.id && (
                                <Badge variant="outline" className="text-xs">
                                  Você
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          {user.user_id === currentUser?.id ? (
                            <Badge
                              variant="outline"
                              className={roleColors[user.role]}
                            >
                              {roleLabels[user.role]}
                            </Badge>
                          ) : (
                            <Select
                              value={user.role}
                              onValueChange={(value) =>
                                handleRoleChange(user.user_id, user.role_id, value as AppRole)
                              }
                              disabled={updatingUserId === user.user_id}
                            >
                              <SelectTrigger className="w-40">
                                {updatingUserId === user.user_id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <SelectValue />
                                )}
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(roleLabels).map(([role, label]) => (
                                  <SelectItem key={role} value={role}>
                                    {label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(user.created_at), "dd 'de' MMM 'de' yyyy", {
                            locale: ptBR,
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Users;
