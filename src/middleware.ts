import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { 
  NextRequest, 
  NextMiddleware } from 'next/server'
 

const middleware: NextMiddleware = async (request: NextRequest) => {
  const token = await getToken({ req: request })
  const pathname = request.nextUrl.pathname
  const areMainNavigationsIncluded = /\/profile$|\/preview$|\/$/.test(pathname)

  if ( token ) {

    if ( pathname === "/login" || pathname === "/register" ) {
      
      return NextResponse.redirect(new URL("/", request.url))
    }

    return null
  }

  if (!token && !areMainNavigationsIncluded) {
  
    return NextResponse.rewrite(new URL(pathname, request.url))
  }

  return NextResponse.redirect(new URL("/login", request.url))
}

export { middleware }
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}