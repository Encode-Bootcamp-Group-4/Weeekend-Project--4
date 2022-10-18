import { Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('mint-tokens')
  mintTokens(
    @Query("to") to: string,
    @Query("amt") amt: number
  ) {
    return this.appService.mintTokens(to, amt);
  }

  @Get('token-address')
  getTokenAddress() {
    return this.appService.getTokenAddress();
  }
  
}
