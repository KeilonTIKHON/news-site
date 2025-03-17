

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
    <div className="comm_add_cont">
      <h3 className="add_comm">Add comment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="namecomm"
          required
        />
        <textarea
          placeholder="Comment text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="comm_text"
          rows="4"
          required
        />
        <button type="submit" className="sendcomm">
          Send
        </button>
      </form>
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default CommentForm;