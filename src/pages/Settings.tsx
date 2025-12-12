import { MainLayout } from '@/components/layout/MainLayout';
import { currentUser } from '@/data/mockData';
import { User, Shield, Bell, Database, Key, Building } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
// ...

// ...

export default function Settings() {
   // --- ESTADO PARA PERFIL DO USUÁRIO ---
  const { profile, updateProfile, changePassword } = useAuth();
  const { toast } = useToast();

  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);

  useEffect(() => {
    if (profile) {
      setUserName(profile.full_name ?? currentUser.name);
      setUserEmail(profile.email ?? currentUser.email);
    }
  }, [profile]);

  // --- ESTADO PARA DADOS DA INSTITUIÇÃO ---
  // Os valores iniciais são os que estão no seu código
  const [institutionId, setInstitutionId] = useState<string | null>(null);
  const [communityName, setCommunityName] = useState("Comunidade Terapêutica Renascer");
  const [cnpj, setCnpj] = useState("12.345.678/0001-90");
  const [address, setAddress] = useState("Rua da Esperança, 100 - Centro - São Paulo/SP");

  useEffect(() => {
    const loadInstitution = async () => {
      try {
        const { data, error } = await supabase.from('institutions').select('*').limit(1).single();
        if (error && (error as any).code !== 'PGRST116') {
          console.error('Error fetching institution:', error);
          return;
        }

        if (data) {
          setInstitutionId(data.id);
          setCommunityName(data.name ?? communityName);
          setCnpj(data.cnpj ?? cnpj);
          setAddress(data.address ?? address);
        }
      } catch (e) {
        console.error('Failed to load institution', e);
      }
    };

    loadInstitution();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as configurações do sistema
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Perfil do Usuário
              </h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                  {currentUser.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{currentUser.name}</p>
                  <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                  <p className="text-sm text-primary mt-1">Coordenador Técnico</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Nome Completo</label>
                  <input
                    type="text"
                    value={userName} onChange={(e) => setUserName(e.target.value)}
                    className="input-field mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    value={userEmail} onChange={(e) => setUserEmail(e.target.value)}  
                    className="input-field mt-1"
                  />
                </div>
              </div>
              <button
                className="btn-primary mt-4"
                onClick={async () => {
                  const { error } = await updateProfile({ full_name: userName, email: userEmail });
                  if (error) return; // toast already shown in context
                }}
              >
                Salvar Alterações
              </button>
            </div>

            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Segurança
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Senha Atual</label>
                  <input type="password" className="input-field mt-1" placeholder="••••••••" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Nova Senha</label>
                    <input type="password" className="input-field mt-1" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Confirmar Senha</label>
                    <input type="password" className="input-field mt-1" placeholder="••••••••" />
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <button
                  className="btn-primary"
                  onClick={async () => {
                    const current = (document.querySelector('input[placeholder="••••••••"]') as HTMLInputElement)?.value;
                    const newPass = (document.querySelectorAll('input[placeholder="••••••••"]')[1] as HTMLInputElement)?.value;
                    const confirm = (document.querySelectorAll('input[placeholder="••••••••"]')[2] as HTMLInputElement)?.value;

                    if (!newPass || newPass !== confirm) {
                      toast({ title: 'Erro', description: 'As senhas não coincidem', variant: 'destructive' });
                      return;
                    }

                    const { error } = await changePassword(newPass);
                    if (error) return;
                    // Clear fields
                    (document.querySelector('input[placeholder="••••••••"]') as HTMLInputElement).value = '';
                    (document.querySelectorAll('input[placeholder="••••••••"]')[1] as HTMLInputElement).value = '';
                    (document.querySelectorAll('input[placeholder="••••••••"]')[2] as HTMLInputElement).value = '';
                  }}
                >
                  Alterar Senha
                </button>
              </div>
            </div>

            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Dados da Instituição
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Nome da Comunidade</label>
                  <input
                    type="text"
                    value={communityName} onChange={(e) => setCommunityName(e.target.value)}
                    className="input-field mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">CNPJ</label>
                  <input
                    type="text"
                    value={cnpj} onChange={(e) => setCnpj(e.target.value)}
                    className="input-field mt-1"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-foreground">Endereço</label>
                  <input
                    type="text"
                    value={address} onChange={(e) => setAddress(e.target.value)}
                    className="input-field mt-1"
                  />
                </div>
              </div>
              <button
                className="btn-primary mt-4"
                onClick={async () => {
                  try {
                    if (institutionId) {
                      const { data, error } = await supabase
                        .from('institutions')
                        .update({ name: communityName, cnpj, address, updated_at: new Date().toISOString() })
                        .eq('id', institutionId)
                        .select()
                        .single();

                      if (error) {
                        toast({ title: 'Erro', description: 'Falha ao salvar dados da instituição.', variant: 'destructive' });
                        console.error(error);
                        return;
                      }

                      toast({ title: 'Dados salvos', description: 'Dados da instituição atualizados.' });
                      setInstitutionId(data.id);
                    } else {
                      const { data, error } = await supabase
                        .from('institutions')
                        .insert({ name: communityName, cnpj, address })
                        .select()
                        .single();

                      if (error) {
                        toast({ title: 'Erro', description: 'Falha ao salvar dados da instituição.', variant: 'destructive' });
                        console.error(error);
                        return;
                      }

                      toast({ title: 'Dados salvos', description: 'Dados da instituição criados.' });
                      setInstitutionId(data.id);
                    }
                  } catch (e) {
                    console.error(e);
                    toast({ title: 'Erro', description: 'Não foi possível salvar os dados.', variant: 'destructive' });
                  }
                }}
              >
                Salvar Dados
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notificações
              </h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Novas avaliações</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Atendimentos agendados</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Alertas de alta</span>
                  <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-foreground">Relatórios semanais</span>
                  <input type="checkbox" className="h-4 w-4 accent-primary" />
                </label>
              </div>
            </div>

            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Backup
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Último backup: 04/12/2024 às 03:00
              </p>
              <button className="w-full btn-primary justify-center">
                Fazer Backup Agora
              </button>
            </div>

            <div className="card-elevated p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Permissões
              </h2>
              <p className="text-sm text-muted-foreground">
                Seu perfil: <span className="font-medium text-primary">Coordenador Técnico</span>
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Visualizar todos os acolhidos
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Criar e editar avaliações
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Gerar relatórios
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  Gerenciar equipe
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
