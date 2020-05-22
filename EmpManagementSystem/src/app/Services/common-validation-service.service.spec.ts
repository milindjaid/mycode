import { TestBed } from '@angular/core/testing';

import { CommonValidationServiceService } from './common-validation-service.service';

describe('CommonValidationServiceService', () => {
  let service: CommonValidationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonValidationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
