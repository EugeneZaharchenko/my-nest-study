import { Body, Controller, Post, Get, Req } from '@nestjs/common';

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
}
