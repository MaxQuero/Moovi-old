import { Test, TestingModule } from '@nestjs/testing';
import { TvShowService } from './tvShow.service';

describe('MovieService', () => {
  let service: TvShowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TvShowService],
    }).compile();

    service = module.get<TvShowService>(TvShowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
