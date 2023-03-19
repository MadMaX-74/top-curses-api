import { Module } from '@nestjs/common';
import { HhService } from './hh.service';
import { TopPageModel } from '../top-page/top-page.model';

@Module({
  providers: [HhService],
  imports: [TopPageModel]
})
export class HhModule {}
