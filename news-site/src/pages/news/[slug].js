import '../../../styles/styles.css'

import CommentForm from '../../../components/CommentForm';

import { useState } from 'react';
import Header from '../../../components/Header';
import { getContentByType, fetchEntryBySlug, fetchCommentsByPostId } from '../lib/contentful';

const NewsPost = ({ post, initialComments }) => {
    const [comments, setComments] = useState(initialComments);
    //const [tr, setTr] = useState(false)
    
    // Обновление комментариев после добавления нового
    const fetchComments = async () => {
        const res = await fetch(`/api/comments?postId=${post.sys.id}`);
        const data = await res.json();
        
        setComments(data);
        
    };
    
    if (!post) return (<p>Запись не найдена</p>)

    return (
        <div className='slugcont'>
            <Header></Header>
            
            <h1 className='newsSlugTitle'>{post.fields.title}</h1>
            <div style={{ backgroundImage: `url(${post.fields.image.fields.file.url})` }} className='slugimg'></div>
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


export async function getStaticPaths() {
    const posts = await getContentByType('news'); 
    const paths = posts.map((post) => ({
        params: { slug: post.fields.slug },
    }));

    return {
        paths,
        fallback: 'blocking', // 'false' | 'blocking' | 'true'
    };
}


export async function getStaticProps({ params }) {
    const post = await fetchEntryBySlug('news', params.slug);

    if (!post) {
        return {

            notFound: true
        }; 
    }
    const comments = await fetchCommentsByPostId(post.sys.id);
    return {
        props: {
            post,
            initialComments: comments,
        },
        revalidate: 60, 
    };
}