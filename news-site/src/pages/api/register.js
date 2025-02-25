import { createClient } from 'contentful-management';
import bcrypt from 'bcrypt';
import { managementClient } from "../lib/contentfulManagement";


const environmentId = 'master';
const contentTypeId = 'user';



export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const space = await managementClient.getSpace(process.env.NEWS_SITE_SPACE_ID);
        const environment = await space.getEnvironment(environmentId);

        // Проверка существования пользователя
        const existingUsers = await environment.getEntries({
            content_type: contentTypeId,
            'fields.email': email,
        });

        if (existingUsers.items.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Хэширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создание пользователя
        const user = await environment.createEntry(contentTypeId, {
            fields: {
                name: { 'en-US': name },
                email: { 'en-US': email },
                password: { 'en-US': hashedPassword },
            },
        });

        await user.publish();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}