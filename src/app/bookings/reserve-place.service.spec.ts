import { TestBed } from '@angular/core/testing';

import { ReservePlaceService } from './reserve-place.service';

describe('ReservePlaceService', () => {
  let service: ReservePlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservePlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
