import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
    publicFiles: es.fileBucket(),
    publicImages: es.imageBucket({
      maxSize: 1024 * 1024 * 10, // 10MB
      accept: ['image/jpeg', 'image/png','image/*'], // wildcard also works: []
    }),
  });


  const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
  });
   
  export { handler as GET, handler as POST };
   
  export type EdgeStoreRouter = typeof edgeStoreRouter;