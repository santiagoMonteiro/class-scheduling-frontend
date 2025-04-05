import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('app.token')?.value

  if (!token) {
    // return NextResponse.redirect(new URL('/login/student', req.url))
  }

  // return NextResponse.next()
}

export const config = {
  // matcher: ['/student/:path*', '/teacher/:path*'],
}
