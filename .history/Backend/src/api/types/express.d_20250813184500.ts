//Expandindo o express

// types/express.d.ts
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // você pode colocar o tipo real do usuário, ex: { id: number; email: string }
  }
}
