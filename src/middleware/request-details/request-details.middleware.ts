import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class RequestDetailsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, url, body, headers } = req;
    const requestData = {
      method: method,
      url: url,
      body: body,
      userAgent: headers['user-agent'],
      contentType: headers['content-type'],
    };
    res.json(requestData);

    next();
  }
}
