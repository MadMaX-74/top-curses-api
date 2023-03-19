import { ModuleMetadata } from '@nestjs/common';

export interface TelegramInterface {
	chatId: string;
	token: string;
}
export interface ITelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => Promise<TelegramInterface> | TelegramInterface;
	inject?: any[];
}
