import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthGuard } from './guards/auth/auth.guard';
import { TestInterceptor } from './interceptors/test/test.interceptor';

@Controller()
export class AppController {
  @Post()
  createMsg(@Body() msg: string) {
    console.log(msg);
    return 'Message received successfully';
  }
  @Get()
  getToken(@Req() req: Request) {
    const token = req['token'];
    return { message: 'Access Authorized', token };
  }
  @Get('getToken')
  checkToken(@Req() req: Request) {
    const token = req['token'];
    return { message: 'Access Authorized', token };
  }
  @Get('client')
  checkContentType() {
    return { message: 'Welcome to /client route' };
  }
}

@Controller()
export class ItcController {
  @Get('all')
  @UseInterceptors(TestInterceptor)
  getAll() {
    return 'Interceptors are working';
  }
}

@Controller('client')
export class ClientController {
  @Get('route1')
  route1() {
    return { message: 'This is Route1 of /client route' };
  }
  @Get('route2')
  route2() {
    return { message: 'This is Route2 of /client route' };
  }
  @Get('route3')
  route3() {
    return { message: 'This is Route3 of /client route' };
  }
  @Post('route4')
  route4(@Req() req: Request) {
    return {
      contentType: req.headers['content-type'],
      message: 'This is Route4 of /client route',
    };
  }
}

@Controller('request')
@UseGuards(AuthGuard)
export class RequestDetailsController {
  @Post('create')
  // @UseGuards(AuthGuard)
  create(@Body() data: any) {
    return data;
  }
  @Get()
  getToken(@Req() req: Request) {
    const token = req['token'];
    return { message: 'Access Authorized', token };
  }
}

export function RequestDetailsMiddleware(
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) {
  const { method, url, body, headers } = req;
  const requestData = {
    method: method,
    url: url,
    body: body,
    userAgent: headers['user-agent'],
    contentType: headers['content-type'],
  };
  res.json(requestData);
}
