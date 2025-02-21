

import { useState } from 'react';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/create-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, content, postId }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Комментарий успешно добавлен!');
      setAuthor('');
      setContent('');
      onCommentAdded(); // Обновляем список комментариев
    } else {
      setMessage(data.message || 'Произошла ошибка');
    }
  };

  return (
    <div className="p-4 border rounded mt-6">
      <h3 className="text-lg mb-2">Добавить комментарий</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Ваше имя"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Комментарий"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded"
          rows="4"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Отправить
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default CommentForm;