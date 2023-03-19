import { TelegramInterface } from '../telegram/telegram.interface';
import { ConfigService } from '@nestjs/config';

export const getTelegramConfig = (configService: ConfigService): TelegramInterface => {
	const token = configService.get('TELEGRAM_BOT_TOKEN')
	if (!token) {
		throw new Error('TELEGRAM_BOT_TOKEN is not set')
	}
	return {
		token,
		chatId: configService.get('TELEGRAM_GROUP_ID') || ''
	};
};
