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
import { UserModule } from './modules/user/user.module';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product';
import { ProductController } from './products/controller/product/product.controller';
import { ProductModule } from './products/module/product/product.module';
import { ProductService } from './products/service/product/product.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestuser',
      password: 'nestpass',
      database: 'my-nest-study',
      entities: [Product],
      logging: true,
      synchronize: true,
    }),
    ProductModule,
  ],
  controllers: [
    AppController,
    ClientController,
    ItcController,
    RequestDetailsController,
    ProductController,
  ],
  providers: [
    AppService,
    AuthGuard,
    ProductService,
    // Global interceptor
    // {
    //   provide: 'APP_INTERCEPTOR',
    //   useClass: AuthInterceptor,
    // },
  ],
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
