import { createClient } from 'contentful-management';

export const managementClient = createClient({
  accessToken: process.env.NEWS_SITE_MANAGEMENT_KEY,
});

// Функция для создания нового комментария
export async function createContentfulComment({ author, content, postId }) {
  const space = await managementClient.getSpace(process.env.NEWS_SITE_SPACE_ID);
  const environment = await space.getEnvironment("master");

  const entry = await environment.createEntry('comment', {
    fields: {
      author: { 'en-US': author },
      commentText: { 'en-US': content },
      commDate: { 'en-US': new Date().toISOString() },
      newspostRef: { 'en-US': { sys: { type: 'Link', linkType: 'Entry', id: postId } } },
    },
  });

  await entry.publish();
  return entry;
}


