import { Test, TestingModule } from '@nestjs/testing';
import { ArgicultureService } from './agriculture.service';

describe('ArgicultureService', () => {
  let service: ArgicultureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArgicultureService],
    }).compile();

    service = module.get<ArgicultureService>(ArgicultureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
