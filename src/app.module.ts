import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import {
  AppController,
  ClientController,
  RequestDetailsController,
  ItcController,
} from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { TokenMiddleware } from './middleware/token.middleware';
import { ContentTypeMiddleware } from './middleware/content-type/content-type.middleware';
import { TimeStampMiddleware } from './middleware/time-stamp/time-stamp.middleware';
import { RequestDetailsMiddleware } from './middleware/request-details/request-details.middleware';
import { AuthGuard } from './guards/auth/auth.guard';

@Module({
  imports: [],
  controllers: [
    AppController,
    ClientController,
    ItcController,
    RequestDetailsController,
  ],
  providers: [AppService, AuthGuard],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    // consumer
    //   .apply(LoggingMiddleware, TimeStampMiddleware)  // multiple middleware GLOBALLY
    //   .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer.apply(TokenMiddleware).forRoutes('/getToken');
    consumer
      .apply(ContentTypeMiddleware)
      .exclude({ path: 'client/route4', method: RequestMethod.POST })
      .forRoutes(ClientController);

    consumer
      .apply(RequestDetailsMiddleware, TimeStampMiddleware)
      .forRoutes(RequestDetailsController);
  }
}
