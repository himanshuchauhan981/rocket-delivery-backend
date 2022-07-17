import { Test, TestingModule } from '@nestjs/testing';
import { UserShippingController } from './shipping.controller';

describe('UserShippingController', () => {
  let controller: UserShippingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserShippingController],
    }).compile();

    controller = module.get<UserShippingController>(UserShippingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
