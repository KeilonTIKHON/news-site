import jwt from 'jsonwebtoken';
import { managementClient } from '../lib/contentfulManagement';
import { verifyJwt } from '@/middleware';

const JWT_SECRET = process.env.JWT_SECRET;
const environmentId = 'master';
const contentTypeId = 'user'

export default async function handler(req, res) {
    if (req.method !== 'GET' && req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const { userId } = await verifyJwt(token);
    if(req.method === 'GET'){
        const token = req.cookies.token;

   

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ message: 'Authorized', user: decoded });
    } catch (error) {
        console.error('Authorization Error:', error.message);
        res.status(401).json({ message: 'Invalid token' });
    }
    }
    if(req.method === 'PUT'){
        const { name, email } = req.body;
        
    try{
        const space = await managementClient.getSpace(process.env.NEWS_SITE_SPACE_ID);
        const environment = await space.getEnvironment(environmentId);
        //const decoded = jwt.verify(token, JWT_SECRET);
        
        const entry = await environment.getEntry(userId);
        
            entry.fields.name['en-US'] = name;
            entry.fields.email['en-US'] = email;
            console.log(entry)
            const updatedEntry = await entry.update();

            
            await environment.getEntry(userId); // Обновление версии перед публикацией
            await updatedEntry.publish();

            return res.status(200).json({ message: 'Profile updated' });
    } catch(error){
        console.error('Profile API Error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
    }
}