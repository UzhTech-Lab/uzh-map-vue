import { Test, TestingModule } from '@nestjs/testing';
import { ArgicultureController } from './agriculture.controller';

describe('ArgicultureController', () => {
  let controller: ArgicultureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArgicultureController],
    }).compile();

    controller = module.get<ArgicultureController>(ArgicultureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
