import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController, ClientController } from './app.controller';
import { AppService } from './app.service';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { TokenMiddleware } from './middleware/token.middleware';
import { ContentTypeMiddleware } from './middleware/content-type/content-type.middleware';

@Module({
  imports: [],
  controllers: [AppController, ClientController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');

    consumer.apply(TokenMiddleware).forRoutes('/getToken');
    consumer
      .apply(ContentTypeMiddleware)
      .exclude({ path: 'client/route4', method: RequestMethod.POST })
      .forRoutes(ClientController);
  }
}
