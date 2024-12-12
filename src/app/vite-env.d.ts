/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}
