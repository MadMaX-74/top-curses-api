import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-topPage.dto';
import { TopPageService } from './top-page.service';
import { CreatePageModel } from './dto/create-top-page.dto';
import { IdValidationPipe } from '../pipes/id-validation-pipe';
import { TopPageConstance } from './top-page.constance';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}
  @UseGuards(JwtGuard)
  @Post('create')
  async create(@Body() dto: CreatePageModel) {
    return this.topPageService.create(dto);
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findById(id);
    if (!page) {
      throw new NotFoundException(TopPageConstance.PAGE_NOT_FOUND_ERROR);
    }
    return page;
  }
  @UseGuards(JwtGuard)
  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.topPageService.findByAlias(alias);
    if (!page) {
      throw new NotFoundException(TopPageConstance.PAGE_NOT_FOUND_ERROR);
    }
    return page;
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const page = await this.topPageService.deleteById(id);
    if (!page) {
      throw new NotFoundException(TopPageConstance.PAGE_NOT_FOUND_ERROR);
    }
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreatePageModel) {
    const page = await this.topPageService.updateById(id, dto);
    if (!page) {
      throw new NotFoundException(TopPageConstance.PAGE_NOT_FOUND_ERROR);
    }
    return page;
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }
  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }
}
