import { TestBed } from '@angular/core/testing';

import { WikiDataService } from './wiki-data.service';

describe('WikiDataService', () => {
  let service: WikiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
