import React, { useState } from 'react';

const AIHelper: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          'HTTP-Referer': 'https://ratioglobus.github.io/tyrell-corp/'
        },
        body: JSON.stringify({
          "model": "deepseek/deepseek-chat-v3-0324:free",
          "messages": [
            {
              "role": "user",
              "content": "Отвечай кратко, дружелюбно и понятно. Не давай философских размышлений без прямого запроса"
            }
          ]
        })
      });

      const data = await res.json();
      const message = data?.choices?.[0]?.message?.content;
      setResponse(message || 'Нет ответа от AI.');
    } catch (err) {
      console.error('Ошибка AI:', err);
      setResponse('Произошла ошибка при получении ответа.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', backgroundColor: '#111', color: '#fff', borderRadius: '8px' }}>
      <h3>🤖 AI Помощник</h3>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Задай мне вопрос..."
        rows={4}
        cols={50}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Жду ответ...' : 'Спросить'}
      </button>
      <div style={{ marginTop: '1rem' }}>
        <strong>Ответ:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default AIHelper;
