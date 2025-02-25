import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import { managementClient } from "../lib/contentfulManagement";

const environmentId = 'master';
const contentTypeId = 'user';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);


function base64UrlEncode(data) {
    return btoa(String.fromCharCode(...new Uint8Array(data)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}


async function createSignature(data, key) {
    const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        new TextEncoder().encode(data)
    );
    return base64UrlEncode(signature);
}


async function createJwt(payload) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const headerB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)));
    const payloadB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)));

    const data = `${headerB64}.${payloadB64}`;

    const key = await crypto.subtle.importKey(
        'raw',
        JWT_SECRET,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const signatureB64 = await createSignature(data, key);
    return `${data}.${signatureB64}`;
}


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        
        const space = await managementClient.getSpace(process.env.NEWS_SITE_SPACE_ID);
        const environment = await space.getEnvironment(environmentId);

        const response = await environment.getEntries({
            content_type: contentTypeId,
            'fields.email': email,
        });

        const user = response.items[0];
        

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        
        const isValidPassword = await bcrypt.compare(password, user.fields.password['en-US']);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        
        const token = await createJwt({
            userId: user.sys.id,
            name: user.fields.name,
            email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60, 
        });

        
        res.setHeader('Set-Cookie', serialize('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
            maxAge: 3600,
        }));

        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}