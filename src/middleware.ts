import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request })

  if ( !token ) {

    return NextResponse.redirect(new URL("/login", request.url))
  }

  if ( request.nextUrl.pathname.startsWith("/profile") ) {
    
    return NextResponse.rewrite(new URL('/profile', request.url))
  }

  return NextResponse.rewrite(new URL('/', request.url))
}

export { middleware }
 
export const config = {
  matcher: [
    "/",
    "/profile"
  ],
}