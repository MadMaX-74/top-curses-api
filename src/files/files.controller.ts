import { Controller, HttpCode, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {
	}
	@Post('upload')
	@HttpCode(200)
	@UseGuards(JwtGuard)
	@UseInterceptors(FileInterceptor('files'))
	async uploadFile(@UploadedFiles() file: Express.Multer.File): Promise<FileElementResponse[]> {
			return this.filesService.saveFiles([file]);
	}
}
