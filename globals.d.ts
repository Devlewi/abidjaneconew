// globals.d.ts
declare global {
    interface Window {
      $: typeof import('jquery');
      jQuery: typeof import('jquery');
      BunyadLazyConf?: { type: string }; // Ajoutez cette ligne pour la configuration de BunyadLazyConf
    }
  }
  
  // types.d.ts
declare module "react-cookie-consent";


  export {};
  