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
