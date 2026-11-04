import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, CheckCircle2, Send } from 'lucide-react';
import PhotoUploader from '@/site/components/portal/PhotoUploader';
import UrgencySelector from '@/site/components/portal/UrgencySelector';
import { createRequest } from '@/site/lib/requestStore';
import type { MaintenanceRequest, Urgency } from '@/site/types/maintenance';

type FormErrors = Partial<Record<'equipment' | 'serialNumber' | 'partName' | 'photo' | 'urgency' | 'symptoms', string>>;

interface FormState {
  equipment: string;
  serialNumber: string;
  partName: string;
  referenceCode: string;
  photoDataUrl: string | null;
  urgency: Urgency | null;
  symptoms: string;
}

const INITIAL_STATE: FormState = {
  equipment: '',
  serialNumber: '',
  partName: '',
  referenceCode: '',
  photoDataUrl: null,
  urgency: null,
  symptoms: '',
};

const validate = (state: FormState): FormErrors => {
  const errors: FormErrors = {};
  if (!state.equipment.trim()) errors.equipment = 'Informe a máquina ou equipamento.';
  if (!state.serialNumber.trim()) errors.serialNumber = 'Informe o número de série.';
  if (!state.partName.trim()) errors.partName = 'Informe o nome da peça solicitada.';
  if (!state.photoDataUrl) errors.photo = 'Anexe uma foto da peça danificada.';
  if (!state.urgency) errors.urgency = 'Escolha o nível de urgência.';
  if (!state.symptoms.trim()) errors.symptoms = 'Descreva o sintoma do defeito.';
  return errors;
};

const inputClass = (hasError: boolean) => `field ${hasError ? '!border-red-400 !ring-red-400/20' : ''}`;

function Field({ label, error, optional, children }: { label: string; error?: string | undefined; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <span className="label">
        {label}
        {optional && <span className="ml-2 font-normal text-graphite-400">(se houver)</span>}
      </span>
      {children}
      {error && <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}

export default function RequestForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<MaintenanceRequest | null>(null);

  const knownEquipment: string[] = [];

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    setSubmitError(null);
    if (Object.keys(found).length > 0 || !form.urgency || !form.photoDataUrl) return;

    setSubmitting(true);
    try {
      const created = await createRequest({
        data: {
          equipment: form.equipment.trim(),
          serialNumber: form.serialNumber.trim(),
          partName: form.partName.trim(),
          referenceCode: form.referenceCode.trim(),
          photoDataUrl: form.photoDataUrl,
          urgency: form.urgency,
          symptoms: form.symptoms.trim(),
        },
      });
      setSubmitted(created);
      setForm(INITIAL_STATE);
    } catch {
      setSubmitError('Não foi possível enviar o pedido. Verifique a conexão e tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="panel flex flex-col items-center px-6 py-14 text-center animate-fadeUp">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 animate-popIn">
          <CheckCircle2 className="h-10 w-10" />
        </span>
        <h2 className="mt-6 text-4xl font-bold text-graphite-950 dark:text-white">Pedido enviado!</h2>
        <p className="mt-3 max-w-sm text-graphite-600 dark:text-graphite-300">
          O estoque e as compras já receberam sua requisição. Guarde o protocolo abaixo para acompanhamento.
        </p>
        <div className="mt-6 rounded-xl border border-dashed border-graphite-300 bg-graphite-50 px-6 py-3 dark:border-graphite-600 dark:bg-graphite-950">
          <span className="block text-xs font-semibold uppercase tracking-widest text-graphite-500">Protocolo</span>
          <span className="font-display text-2xl font-bold tracking-wider text-graphite-900 dark:text-alert-300">
            {submitted.id.slice(-6).toUpperCase()}
          </span>
        </div>
        <button type="button" onClick={() => setSubmitted(null)} className="btn-primary mt-8">
          Fazer nova requisição
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="panel space-y-7 p-5 sm:p-8">
      <section className="space-y-5">
        <h2 className="text-2xl font-bold text-graphite-950 dark:text-white">1. Equipamento</h2>
        <Field label="Equipamento / máquina" error={errors.equipment}>
          <input
            type="text"
            list="equipamentos-conhecidos"
            value={form.equipment}
            onChange={(event) => update('equipment', event.target.value)}
            placeholder="Ex.: Prensa hidráulica PH-04"
            className={inputClass(Boolean(errors.equipment))}
            autoComplete="off"
          />
          <datalist id="equipamentos-conhecidos">
            {knownEquipment.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </Field>
        <Field label="Número de série" error={errors.serialNumber}>
          <input
            type="text"
            value={form.serialNumber}
            onChange={(event) => update('serialNumber', event.target.value)}
            placeholder="Está na plaqueta da máquina"
            className={inputClass(Boolean(errors.serialNumber))}
          />
        </Field>
      </section>

      <section className="space-y-5 border-t border-graphite-200 pt-7 dark:border-graphite-800">
        <h2 className="text-2xl font-bold text-graphite-950 dark:text-white">2. Peça</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Peça solicitada" error={errors.partName}>
            <input
              type="text"
              value={form.partName}
              onChange={(event) => update('partName', event.target.value)}
              placeholder="Ex.: Rolamento 6205"
              className={inputClass(Boolean(errors.partName))}
            />
          </Field>
          <Field label="Código de referência" optional>
            <input
              type="text"
              value={form.referenceCode}
              onChange={(event) => update('referenceCode', event.target.value)}
              placeholder="Código do fabricante"
              className={inputClass(false)}
            />
          </Field>
        </div>
        <Field label="Foto da peça danificada" error={errors.photo}>
          <PhotoUploader
            value={form.photoDataUrl}
            onChange={(dataUrl) => update('photoDataUrl', dataUrl)}
            invalid={Boolean(errors.photo)}
          />
        </Field>
      </section>

      <section className="space-y-5 border-t border-graphite-200 pt-7 dark:border-graphite-800">
        <h2 className="text-2xl font-bold text-graphite-950 dark:text-white">3. Urgência e defeito</h2>
        <Field label="Nível de urgência" error={errors.urgency}>
          <UrgencySelector
            value={form.urgency}
            onChange={(urgency) => update('urgency', urgency)}
            invalid={Boolean(errors.urgency)}
          />
        </Field>
        <Field label="Observações e sintoma do defeito" error={errors.symptoms}>
          <textarea
            rows={4}
            value={form.symptoms}
            onChange={(event) => update('symptoms', event.target.value)}
            placeholder="O que acontece? Ruído, vazamento, pressão baixa, quando começou..."
            className={`${inputClass(Boolean(errors.symptoms))} resize-y`}
          />
        </Field>
      </section>

      {submitError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {submitError}
        </p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full py-4 text-lg">
        <Send className="h-5 w-5" />
        {submitting ? 'Enviando...' : 'Enviar requisição'}
      </button>
    </form>
  );
}
