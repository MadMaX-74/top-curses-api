import { Inject, Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { TelegramInterface } from './telegram.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegramService {
	bot: Telegraf;
	options: TelegramInterface;
	constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: TelegramInterface) {
		this.bot = new Telegraf<Context>(options.token);
		this.options = options;
	}
	async sendMessage(message: string, chatId: string = this.options.chatId) {
		await this.bot.telegram.sendMessage(chatId, message)
	}
}
