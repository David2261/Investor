/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_CKEDITOR_KEY: string;
    readonly CKEDITOR_KEY_DEV: string;
    readonly CKEDITOR_KEY_PROD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}