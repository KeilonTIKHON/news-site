import { NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Utility to decode Base64Url to Base64
function base64UrlToBase64(base64Url) {
    return base64Url.replace(/-/g, '+').replace(/_/g, '/')
        .padEnd(base64Url.length + (4 - base64Url.length % 4) % 4, '=');
}

// Decode JWT and verify signature
export async function verifyJwt(token) {
    const [headerB64, payloadB64, signatureB64] = token.split('.');

    const header = JSON.parse(atob(base64UrlToBase64(headerB64)));
    const payload = JSON.parse(atob(base64UrlToBase64(payloadB64)));
    const signature = base64UrlToBase64(signatureB64);

    const data = `${headerB64}.${payloadB64}`;

    const key = await crypto.subtle.importKey(
        'raw',
        JWT_SECRET,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
    );

    const valid = await crypto.subtle.verify(
        'HMAC',
        key,
        Uint8Array.from(atob(signature), c => c.charCodeAt(0)),
        new TextEncoder().encode(data)
    );

    if (!valid) throw new Error('Invalid JWT Signature');

    return payload;
}

export async function middleware(req) {
    const token = req.cookies.get('token')?.value;
    
    if (!token) {
        return NextResponse.redirect(new URL('/news/login', req.url));
    }

    try {
        const smth = await verifyJwt(token);
        return NextResponse.next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return NextResponse.redirect(new URL('/news/login', req.url));
    }
}

export const config = {
    matcher: ['/profile/:path*', '/dashboard/:path*'],
};