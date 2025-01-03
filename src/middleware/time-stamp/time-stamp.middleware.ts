import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class TimeStampMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  use(req: any, res: any, next: () => void) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}]`);
  }
}
