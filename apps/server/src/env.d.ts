declare namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      PORT: number;
      SECRET: string;
      TOMTOMAPIKEY: string;
      TOMTOMURL: string;
    }
  }