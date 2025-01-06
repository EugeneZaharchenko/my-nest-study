import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable()
export class UserDataTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.method === 'POST') {
      const { id, name, email, password } = request.body;
      if (!id || !name || !email || !password) {
        throw new BadRequestException('A field is missing');
      }
    }

    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return {
            data: data.map((user) => this.transformUser(user)),
          };
        } else if (data && typeof data === 'object') {
          return this.transformUser(data);
        }
        return data;
      }),
      catchError(() =>
        throwError(() => new NotFoundException('Please give a valid id')),
      ),
    );
  }

  private transformUser(user: any): any {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
