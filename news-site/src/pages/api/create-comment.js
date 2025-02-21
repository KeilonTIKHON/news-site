import { createContentfulComment } from '../lib/contentfulManagement';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { author, content, postId } = req.body;

      if (!author || !content || !postId) {
        return res.status(400).json({ message: 'Все поля обязательны!' });
      }

      const comment = await createContentfulComment({ author, content, postId });
      res.status(200).json({ message: 'Комментарий успешно добавлен!', comment });
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Метод ${req.method} не поддерживается`);
  }
}