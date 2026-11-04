import { useId, useRef, useState } from 'react';
import { Camera, ImagePlus, X } from 'lucide-react';
import { compressImageToDataUrl } from '@/site/lib/imageFile';

interface PhotoUploaderProps {
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  invalid: boolean;
}

export default function PhotoUploader({ value, onChange, invalid }: PhotoUploaderProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setProcessing(true);
    try {
      onChange(await compressImageToDataUrl(file));
    } catch {
      setError('Não foi possível carregar esta imagem. Tente outra foto.');
    } finally {
      setProcessing(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  if (value) {
    return (
      <div className="relative overflow-hidden rounded-2xl border-2 border-graphite-200 bg-graphite-900 dark:border-graphite-700">
        <img src={value} alt="Pré-visualização da peça danificada" className="h-64 w-full object-contain sm:h-80" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-graphite-950/90 to-transparent p-4">
          <span className="text-sm font-medium text-white">Foto anexada</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="rounded-lg bg-white/15 px-3 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25"
            >
              Trocar
            </button>
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label="Remover foto"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/90 text-white transition hover:bg-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
      </div>
    );
  }

  return (
    <div>
      <label
        htmlFor={inputId}
        className={`group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition duration-200 hover:border-alert-400 hover:bg-alert-50/60 dark:hover:bg-alert-500/5 ${
          invalid ? 'border-red-400 bg-red-50/50 dark:bg-red-500/5' : 'border-graphite-300 bg-graphite-50 dark:border-graphite-600 dark:bg-graphite-950'
        }`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-steel-100 text-steel-700 transition group-hover:scale-110 group-hover:bg-alert-100 group-hover:text-alert-700 dark:bg-steel-900 dark:text-steel-300">
          {processing ? <ImagePlus className="h-6 w-6 animate-pulse" /> : <Camera className="h-6 w-6" />}
        </span>
        <span className="font-semibold text-graphite-800 dark:text-graphite-100">
          {processing ? 'Preparando foto...' : 'Tirar foto ou enviar imagem'}
        </span>
        <span className="text-sm text-graphite-500 dark:text-graphite-400">Toque para abrir a câmera ou a galeria</span>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          disabled={processing}
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
      </label>
      {error && <p className="mt-2 text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
}
