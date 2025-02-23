import { TestBed } from '@angular/core/testing';

import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a default statResultCount of 10', () => {
    expect(service.statResultCount).toBe(10);
  });

  it('should set statResultCount to 20', () => {
    service.statResultCount = 20;
    expect(service.statResultCount).toBe(20);
  });

  it('should throw an error if statResultCount is less than 3', () => {
    expect(() => {
      service.statResultCount = 2;
    }).toThrowError('statResultCount must be at least 3');
  });

  it('should throw an error if statResultCount is greater than 30', () => {
    expect(() => {
      service.statResultCount = 31;
    }).toThrowError('statResultCount must be less than 30');
  });
});
