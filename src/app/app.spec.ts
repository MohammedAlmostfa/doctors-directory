import { describe, expect, it } from 'vitest';
import { LabsService } from './core/services/labs.service';

describe('LabsService', () => {
  it('should load lab records', () => {
    const service = new LabsService();
    expect(service.getAll().length).toBeGreaterThan(0);
  });

  it('should include the expected fields for a lab item', () => {
    const service = new LabsService();
    const firstLab = service.getAll()[0];

    expect(firstLab).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      city: expect.any(String),
      area: expect.any(String),
      homeVisit: expect.any(Boolean),
      ranges: expect.any(Array),
    });
  });
});
