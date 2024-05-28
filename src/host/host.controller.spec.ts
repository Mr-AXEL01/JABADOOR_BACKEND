import { Test, TestingModule } from '@nestjs/testing';
import { HostController } from './Host.controller';

describe('HostController', () => {
  let controller: HostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostController],
    }).compile();

    controller = module.get<HostController>(HostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});