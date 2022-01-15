import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    return middlefunc(req, res, next);
  }
}

export function middlefunc(req: Request, res: Response, next: NextFunction) {
  console.log('hello');
  next();
}
