import { useState, type FormEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { MessageCircle, Send, X } from 'lucide-react';

type Msg = { from: 'user' | 'bot'; text: string };

const GREETING: Msg = {
  from: 'bot',
  text: 'Olá! Precisa de ajuda para pedir uma peça? Abra o Portal do Técnico e preencha o formulário.',
};

export default function ChatWidget() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);

  const send = (e: FormEvent) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setText('');
    // Comando escondido: abre o painel de pedidos
    if (value.toLowerCase() === '/painel') {
      navigate({ to: '/painel' });
      return;
    }
    setMsgs((m) => [
      ...m,
      { from: 'user', text: value },
      {
        from: 'bot',
        text: 'Mensagem recebida! Para pedir uma peça, use o Portal do Técnico — o estoque recebe na hora.',
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="panel flex h-96 w-80 flex-col overflow-hidden animate-fadeUp">
          <div className="flex items-center justify-between bg-steel-950 px-4 py-3 text-steel-50">
            <span className="font-display text-lg font-bold uppercase tracking-wide">Chat</span>
            <button type="button" onClick={() => setOpen(false)} aria-label="Fechar chat">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  m.from === 'user'
                    ? 'self-end bg-alert-500 text-graphite-950'
                    : 'self-start bg-graphite-100 text-graphite-800 dark:bg-graphite-800 dark:text-graphite-100'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-graphite-200 p-2 dark:border-graphite-700">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite uma mensagem..."
              className="field py-2"
              aria-label="Mensagem"
            />
            <button type="submit" className="btn-primary px-3 py-2" aria-label="Enviar">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="btn-primary h-14 w-14 rounded-full p-0"
        aria-label="Abrir chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
