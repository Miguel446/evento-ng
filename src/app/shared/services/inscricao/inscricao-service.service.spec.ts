import { TestBed } from '@angular/core/testing';

import { InscricaoServiceService } from './inscricao-service.service';

describe('InscricaoServiceService', () => {
  let service: InscricaoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscricaoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
