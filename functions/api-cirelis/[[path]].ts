export interface Env { VITE_BACKENDSERVER: string; }

function joinUrl(base: string, path: string) {
  return base.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');
}

export async function onRequest(context: { request: Request; env: Env; params: any }) {
  const { request, env, params } = context;
  if (!env.VITE_BACKENDSERVER) return new Response('Missing VITE_BACKENDSERVER env var', { status: 500 });

  const pathParts: string[] = (params?.path as string[]) ?? [];
  const incomingUrl = new URL(request.url);

  const upstreamUrl = new URL(joinUrl(env.VITE_BACKENDSERVER, pathParts.join('/')));
  upstreamUrl.search = incomingUrl.search;

  const headers = new Headers(request.headers);
  headers.delete('host');

  const resp = await fetch(upstreamUrl.toString(), {
    method: request.method,
    headers,
    body: ['GET','HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
    redirect: 'manual',
  });

  return new Response(resp.body, { status: resp.status, headers: resp.headers });
}