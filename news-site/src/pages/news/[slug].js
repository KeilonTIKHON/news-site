import '../../../styles/styles.css'

import CommentForm from '../../../components/CommentForm';

import { useState } from 'react';

import { getContentByType, fetchEntryBySlug, fetchCommentsByPostId } from '../lib/contentful';

const NewsPost = ({ post, initialComments }) => {
    const [comments, setComments] = useState(initialComments);
    //const [tr, setTr] = useState(false)
    console.log(post.sys.id)
  // Обновление комментариев после добавления нового
  const fetchComments = async () => {
    const res = await fetch(`/api/comments?postId=${post.sys.id}`);
    const data = await res.json();
    console.log(data)
    setComments(data);
    console.log(data)
  };
    console.log(post)
  if (!post) return (<p>Запись не найдена</p>)

  return (
    <div className='slugcont'>
        <button onClick={()=>{console.log(comments)}}>RRR</button>
      <h1 className='newsSlugTitle'>{post.fields.title}</h1>
      <div style={{backgroundImage:`url(${post.fields.image.fields.file.url})`}} className='slugimg'></div>
      <p className='short_description'>{post.fields.short_description}</p>
      <div className='mainnewstext_cont'>
        <p className='mainnewstext'>{post.fields.body}</p>
      </div>
      <CommentForm postId={post.sys.id} onCommentAdded={fetchComments} />

      <div className="mt-6">
        <h2 className="text-xl mb-4">Комментарии:</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.sys.id} className="p-4 border rounded mb-2">
              <p><strong>{comment.fields.author}</strong>:</p>
              <p>{comment.fields.commentText}</p>
              <small>{new Date(comment.fields.commDate).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>Пока нет комментариев.</p>
        )}
      </div>
    </div>
  );
};

export default NewsPost;

// Генерируем пути для всех постов во время сборки
export async function getStaticPaths() {
  const posts = await getContentByType('news'); // Замените на ваш content_type
  const paths = posts.map((post) => ({
    params: { slug: post.fields.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // 'false' | 'blocking' | 'true'
  };
}

// Получаем данные конкретного поста по slug
export async function getStaticProps({ params }) {
  const post = await fetchEntryBySlug('news', params.slug);

  if (!post) {
    return {
        
        notFound: true 
    }; // Отображаем 404, если запись не найдена
  }
  const comments = await fetchCommentsByPostId(post.sys.id);
  return {
    props: { post,
        initialComments: comments,
     },
    revalidate: 60, // Инкрементальная регенерация (ISR)
  };
}