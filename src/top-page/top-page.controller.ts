import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductModel } from '../product/product.model';
import { FindProductDto } from '../product/dto/find-product.dto';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-topPage.dto';
import { ConfigService } from '@nestjs/config';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly configService: ConfigService) {}
  @Post('create')
  async create(@Body() dto: Omit<TopPageModel, '_id'>) {}

  @Get('get/:alias')
  async get(@Param('alias') alias: string): Promise<TopPageModel> {
    this.configService('TEST');
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: TopPageModel) {}
  @HttpCode(200)
  @Post()
  async find(@Body() dto: FindTopPageDto) {}
}
