import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constance';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserEmail } from '../decorators/user-email.decorator';
import { TelegramService } from '../telegram/telegram.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService, private readonly telegramService: TelegramService) {}
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
	return this.reviewService.create(dto);
  }
	@UsePipes(new ValidationPipe())
	@Post('notify')
	async notify(@Body() dto: CreateReviewDto) {
		const message = `Name:${dto.name}\n` +
			`Title: ${dto.title}\n` +
			`Description: ${dto.description}\n` +
			`Rating: ${dto.rating}\n` +
			`productId: ${dto.productId}`
		return this.telegramService.sendMessage(message)
	}
  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
	const deletedDoc = await this.reviewService.delete(id);
	if (!deletedDoc) {
		throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
	}
  }

  @Get('byProduct/:productId')
  async getByProduct(
	@Param('productId') productId: string,
	@UserEmail() email: string,
  ) {
	return this.reviewService.findByProductId(productId);
  }
}
