import prisma from '../../lib/prisma';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        try {
            const user = await prisma.user.create({
                data: { name, email, password }
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'User creation failed' });
        }
    } else if (req.method === 'GET') {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Fetching users failed' });
        }
    }
}
