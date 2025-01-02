import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ContentTypeMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const contentType = req.headers['content-type'];
    if (!contentType) {
      return res.status(400).json({
        message: 'content-type is required',
      });
    }

    if (contentType !== 'application/json') {
      return res.status(415).send('Unsupported Media Type');
    }

    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    next();
  }
}
