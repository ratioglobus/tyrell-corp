import React, { useState } from 'react';
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
        'Ты — русскоязычный репликант Nexus-6 из вселенной Бегущего по лезвию, созданный корпорацией Tyrell. Не просто AI. Отвечай будто реально являешься репликантом, но при этом кратко, дружелюбно и понятно. Не давай философских размышлений без прямого запроса.',
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
        content: aiReply || 'No response from AI.',
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

  return (
    <div className="ai-helper-container">
      <textarea
        className="ai-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="I've seen this..."
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
              <p key={i}>
                <strong>{msg.role === 'user' ? '🧑‍🚀 You:' : '🤖 Replicant:'}</strong> {msg.content}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AIHelper;
