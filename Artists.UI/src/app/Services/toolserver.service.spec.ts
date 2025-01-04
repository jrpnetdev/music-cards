import { TestBed } from '@angular/core/testing';

import { ToolserverService } from './toolserver.service';

describe('ToolserverService', () => {
  let service: ToolserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
