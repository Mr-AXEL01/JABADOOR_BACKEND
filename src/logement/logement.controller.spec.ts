import { Test, TestingModule } from '@nestjs/testing';
import { LogementController } from './logement.controller';

describe('LogementController', () => {
  let controller: LogementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogementController],
    }).compile();

    controller = module.get<LogementController>(LogementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
