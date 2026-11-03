import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { environment } from '../../../environments/environment';
import { LabsService } from './labs.service';

describe('LabsService', () => {
  let service: LabsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LabsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(LabsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads and maps laboratory API records', () => {
    service.load();

    expect(service.loading()).toBe(true);

    http.expectOne(`${environment.apiUrl}/laboratories`).flush({
      data: [
        {
          id: 4,
          name: 'مخبر الشفاء',
          address: 'المزة',
          map_url: null,
          phone: '0111234567',
          mobile: null,
          whatsapp: null,
          description: null,
          image: null,
          home_visit: true,
          services: [],
          workingHours: [
            { id: 1, day_of_week: 6, start_minute: 480, end_minute: 960 },
          ],
          area: {
            id: 2,
            name: 'المزة',
            governorate: { id: 1, name: 'دمشق' },
          },
        },
      ],
    });

    expect(service.loading()).toBe(false);
    expect(service.loaded()).toBe(true);
    expect(service.error()).toBeNull();
    expect(service.getById(4)).toMatchObject({
      id: 4,
      name: 'مخبر الشفاء',
      governorate: 'دمشق',
      area: 'المزة',
      homeVisit: true,
      workingHours: {
        sat: ['08:00-16:00'],
      },
    });
  });

  it('does not send duplicate requests while loading or after success', () => {
    service.load();
    service.load();

    const request = http.expectOne(`${environment.apiUrl}/laboratories`);
    request.flush({ data: [] });

    service.load();
    http.expectNone(`${environment.apiUrl}/laboratories`);
  });
});
