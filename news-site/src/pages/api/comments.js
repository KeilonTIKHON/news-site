import { managementClient } from "../lib/contentfulManagement";

export default async function handler(req, res) {
    const contentTypeId = 'comment';
    const { method } = req;
    const space = await managementClient.getSpace(process.env.NEWS_SITE_SPACE_ID);
      const environment = await space.getEnvironment("master");

        // 📦 GET: Получение всех комментариев для определенного поста
        if (method === 'GET') {
            const { postId } = req.query;

            if (!postId) {
                return res.status(400).json({ message: 'Post ID is required' });
            }

            const response = await environment.getEntries({
                content_type: contentTypeId,
                'fields.newspostRef.sys.id': postId,
                order: '-sys.createdAt',
            });
            //console.log(res)
            const comments = response.items.map((item)=>{
                //console.log(item.fields.author)
                    item.fields.author=item.fields.author['en-US']
                    item.fields.commentText=item.fields.commentText['en-US']
                    item.fields.commDate=item.fields.commDate['en-US']
                    item.fields.newspostRef=item.fields.newspostRef['en-US']
                return item;
            })
            //console.log(comments)
            return res.status(200).json(comments);
        }
    }