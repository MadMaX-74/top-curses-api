import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constance';
import { AuthDto } from '../src/auth/dto/auth.dto';


const loginDto: AuthDto = {
	login: 'a@a.com',
	password: '1'
}
describe('AuthController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;
	let token: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

	});

	it('/auth/login/ (POST) success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login/')
			.send(loginDto)
			.expect(200)
			.then(({ body }:request.Response) => {
				expect(body.access_token).toBeDefined()
			})
	});

	afterAll(() => {
		disconnect();
	})
});
