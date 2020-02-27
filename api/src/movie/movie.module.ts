import {HttpModule, Module} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';

@Module({
  imports: [
    HttpModule
  ],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}

