import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone()
  const path = req.nextUrl.pathname

  const isExcluded = path.startsWith('/api') || path.startsWith('/static') || path.includes('.')
  if (isExcluded) return

  const hostname = req.headers.get('host')

  const slug = hostname?.split('.')[0]
  const { pathname } = req.nextUrl

  url.pathname = '/' + slug + pathname
  return NextResponse.rewrite(url)
}
