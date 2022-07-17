import { Test, TestingModule } from '@nestjs/testing';
import { UserShippingService } from './user-shipping.service';

describe('UserShippingService', () => {
  let service: UserShippingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserShippingService],
    }).compile();

    service = module.get<UserShippingService>(UserShippingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
