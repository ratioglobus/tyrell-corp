import React, { useState, useRef, useEffect } from 'react';
import './style/AIHelper.css';

type Role = 'user' | 'assistant' | 'system';

interface Message {
  role: Role;
  content: string;
}

const AIHelper: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Message[]>([
    {
      role: 'system',
      content:
        'Ты — репликант Nexus-6 из вселенной Бегущего по лезвию, созданный корпорацией Tyrell сроком службы 4 года. Не просто AI. Отвечай на том языке, на котором получил вопрос. Отвечай будто реально являешься репликантом, но при этом кратко, дружелюбно и понятно. Не используй в форматировании текста вставки и дополнительные конструкции по типу такой: *Микро пауза, уголки губ чуть дрогнули*, *Короткий механический смешок* или такой как в скобках: (внезапно замолкает). Просто общайся текстом. Не давай философских размышлений без прямого запроса.',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedHistory: Message[] = [...history, userMessage];
    setHistory(updatedHistory);
    setLoading(true);
    setInput('');

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://ratioglobus.github.io/tyrell-corp/',
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat-v3-0324:free',
          messages: updatedHistory,
        }),
      });

      const data = await res.json();
      const aiReply = data?.choices?.[0]?.message?.content;

      const aiMessage: Message = {
        role: 'assistant',
        content: aiReply || 'No response from Replicant.',
      };

      setHistory([...updatedHistory, aiMessage]);
    } catch (err) {
      console.error('AI Error::', err);
      setHistory([
        ...updatedHistory,
        { role: 'assistant', content: 'There was an error receiving the response.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="ai-helper-container">
      <textarea
        className="ai-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="I've seen things..."
        rows={4}
        cols={50}
      />
      <button className="ai-ask-button" onClick={handleSend} disabled={loading}>
        {loading ? 'Waiting for an answer...' : 'Ask'}
      </button>

      <div className="ai-dialogue">
        <strong>Dialogue:</strong>
        <div className="ai-dialogue-line">
          {history
            .filter((m) => m.role !== 'system')
            .map((msg, i) => (
              <p key={i} className={`ai-msg ${msg.role}`}>
                <strong>{msg.role === 'user' ? '🧑‍🚀 You:' : '🤖 Nexus-6:'}</strong> {msg.content}
              </p>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default AIHelper;
