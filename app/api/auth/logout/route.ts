import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL));
        response.cookies.delete('token');
        return response;
    } catch (error) {
        console.error('Error en el logout:', error);
        return NextResponse.error();
    }
}
