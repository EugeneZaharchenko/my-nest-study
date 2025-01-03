import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();
    console.log('Before...');
    console.log(dt);
    return next
      .handle()
      .pipe(tap(() => console.log(`After...${Date.now() - dt}ms`)));
  }
}
