declare namespace NodeJS {
  interface ProcessEnv {
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
    PORT: string;
    JWT_SECRET: string;
  }
}
