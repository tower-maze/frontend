import { TestBed } from '@angular/core/testing';

import { UserResolver } from './user.resolver';

describe('AuthService', () => {
  let service: UserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
