const contentful = require('contentful')

export const client = contentful.createClient({
  space: `${process.env.NEWS_SITE_SPACE_ID}`,
  environment: "master", // defaults to 'master' if not set
  accessToken: `${process.env.NEWS_SITE_CONTENT_DELIVERY_KEY}`
})

export async function getContentByType(contentType) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}
export async function fetchCommentsByPostId(postId) {
  try {
    const response = await client.getEntries({
      content_type: 'comment', // ID типа контента "comment" в Contentful
      'fields.newspostRef.sys.id': postId, // Фильтрация по связанному посту
      order: '-fields.commDate', // Сортировка по дате (новые сверху)
    });

    return response.items;
  } catch (error) {
    console.error('Ошибка при получении комментариев:', error);
    return [];
  }
}


// Получаем данные конкретной записи по slug
export async function fetchEntryBySlug(contentType, slug) {
  const entries = await client.getEntries({
    content_type: contentType,
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0];
}