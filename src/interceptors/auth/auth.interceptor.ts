import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Missing auth token ((');
    }

    const userId: number = +request.params.id;
    const user = this.userService.findOne(userId);

    if (!user || user.password !== token) {
      throw new UnauthorizedException('Invalid token, user not found');
    }

    return next.handle();
  }
}
