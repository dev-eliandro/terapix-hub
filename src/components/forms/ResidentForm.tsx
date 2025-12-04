import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Resident, Gender, MaritalStatus, AccommodationStatus } from '@/types';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';

interface ResidentFormProps {
  isOpen: boolean;
  onClose: () => void;
  resident?: Resident;
}

const genderOptions: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Feminino' },
  { value: 'other', label: 'Outro' },
];

const maritalOptions: { value: MaritalStatus; label: string }[] = [
  { value: 'single', label: 'Solteiro(a)' },
  { value: 'married', label: 'Casado(a)' },
  { value: 'divorced', label: 'Divorciado(a)' },
  { value: 'widowed', label: 'Viúvo(a)' },
  { value: 'stable_union', label: 'União Estável' },
];

const statusOptions: { value: AccommodationStatus; label: string }[] = [
  { value: 'active', label: 'Ativo' },
  { value: 'discharged', label: 'Alta Terapêutica' },
  { value: 'evaded', label: 'Evasão' },
  { value: 'terminated', label: 'Desligado' },
];

export function ResidentForm({ isOpen, onClose, resident }: ResidentFormProps) {
  const { addResident, updateResident } = useData();
  const isEditing = !!resident;

  const [formData, setFormData] = useState({
    fullName: resident?.fullName || '',
    cpf: resident?.cpf || '',
    rg: resident?.rg || '',
    birthDate: resident?.birthDate ? new Date(resident.birthDate).toISOString().split('T')[0] : '',
    gender: resident?.gender || 'male' as Gender,
    maritalStatus: resident?.maritalStatus || 'single' as MaritalStatus,
    education: resident?.education || '',
    birthplace: resident?.birthplace || '',
    street: resident?.address.street || '',
    number: resident?.address.number || '',
    complement: resident?.address.complement || '',
    neighborhood: resident?.address.neighborhood || '',
    city: resident?.address.city || '',
    state: resident?.address.state || '',
    zipCode: resident?.address.zipCode || '',
    emergencyName: resident?.emergencyContact.name || '',
    emergencyRelationship: resident?.emergencyContact.relationship || '',
    emergencyPhone: resident?.emergencyContact.phone || '',
    judicialSituation: resident?.judicialSituation || '',
    admissionDate: resident?.admissionDate ? new Date(resident.admissionDate).toISOString().split('T')[0] : '',
    expectedDischargeDate: resident?.expectedDischargeDate ? new Date(resident.expectedDischargeDate).toISOString().split('T')[0] : '',
    status: resident?.status || 'active' as AccommodationStatus,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.cpf || !formData.admissionDate) {
      toast.error('Preencha os campos obrigatórios: Nome, CPF e Data de Admissão');
      return;
    }

    const residentData: Resident = {
      id: resident?.id || crypto.randomUUID(),
      fullName: formData.fullName,
      cpf: formData.cpf,
      rg: formData.rg,
      birthDate: new Date(formData.birthDate),
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      education: formData.education,
      birthplace: formData.birthplace,
      address: {
        street: formData.street,
        number: formData.number,
        complement: formData.complement,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      emergencyContact: {
        name: formData.emergencyName,
        relationship: formData.emergencyRelationship,
        phone: formData.emergencyPhone,
      },
      judicialSituation: formData.judicialSituation || undefined,
      admissionDate: new Date(formData.admissionDate),
      expectedDischargeDate: formData.expectedDischargeDate ? new Date(formData.expectedDischargeDate) : undefined,
      status: formData.status,
      createdAt: resident?.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (isEditing) {
      updateResident(resident.id, residentData);
      toast.success('Acolhido atualizado com sucesso!');
    } else {
      addResident(residentData);
      toast.success('Acolhido cadastrado com sucesso!');
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Editar Acolhido' : 'Novo Acolhido'} size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dados Pessoais */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Dados Pessoais</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-foreground">Nome Completo *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="input-field mt-1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">CPF *</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                className="input-field mt-1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">RG</label>
              <input
                type="text"
                name="rg"
                value={formData.rg}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Data de Nascimento</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Sexo</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="input-field mt-1">
                {genderOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Estado Civil</label>
              <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="input-field mt-1">
                {maritalOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Escolaridade</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-foreground">Naturalidade</label>
              <input
                type="text"
                name="birthplace"
                value={formData.birthplace}
                onChange={handleChange}
                placeholder="Cidade, Estado"
                className="input-field mt-1"
              />
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Endereço</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-foreground">Logradouro</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Número</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Complemento</label>
              <input
                type="text"
                name="complement"
                value={formData.complement}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Bairro</label>
              <input
                type="text"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Cidade</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Estado</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                maxLength={2}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">CEP</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="00000-000"
                className="input-field mt-1"
              />
            </div>
          </div>
        </div>

        {/* Contato de Emergência */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Contato de Emergência</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Nome</label>
              <input
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Parentesco</label>
              <input
                type="text"
                name="emergencyRelationship"
                value={formData.emergencyRelationship}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Telefone</label>
              <input
                type="text"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                className="input-field mt-1"
              />
            </div>
          </div>
        </div>

        {/* Situação no Programa */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Situação no Programa</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Data de Admissão *</label>
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className="input-field mt-1"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Previsão de Alta</label>
              <input
                type="date"
                name="expectedDischargeDate"
                value={formData.expectedDischargeDate}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="input-field mt-1">
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Situação Judicial</label>
              <input
                type="text"
                name="judicialSituation"
                value={formData.judicialSituation}
                onChange={handleChange}
                className="input-field mt-1"
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-lg border border-border text-foreground hover:bg-muted transition-colors">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            {isEditing ? 'Salvar Alterações' : 'Cadastrar Acolhido'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
