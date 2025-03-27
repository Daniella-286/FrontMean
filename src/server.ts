import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

// Créez une instance de AngularAppEngine
const angularAppEngine = new AngularAppEngine();

// Fonction principale pour gérer les requêtes
export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  // Vous pouvez définir des points de terminaison API ici si nécessaire.
  // Exemple :
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello from the API' });
  // }

  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * Le gestionnaire de requêtes utilisé par Angular CLI (dev-server et lors de la construction).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
