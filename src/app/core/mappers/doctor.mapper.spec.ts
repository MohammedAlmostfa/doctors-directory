import { describe, expect, it } from 'vitest';
import { DoctorApiDto } from '../dto/doctor-api.dto';
import { mapDoctor } from './doctor.mapper';

describe('mapDoctor', () => {
  it('maps public profile fields used by doctor cards and details', () => {
    const doctor: DoctorApiDto = {
      id: 1,
      name: 'د. أحمد',
      address: 'شارع المثال',
      map_url: null,
      phone: '0111234567',
      mobile: '0991234567',
      whatsapp: null,
      email: 'doctor@example.com',
      experience_years: 10,
      about: 'نبذة',
      profile_image: 'https://example.com/doctor.jpg',
      interests: ['القلبية', 'الضغط'],
      specialty: { id: 2, name: 'القلبية' },
      area: {
        id: 3,
        name: 'المزة',
        governorate: { id: 4, name: 'دمشق' },
      },
      workingHours: [
        {
          id: 5,
          day_of_week: 6,
          start_minute: 540,
          end_minute: 1020,
        },
      ],
    };

    expect(mapDoctor(doctor)).toMatchObject({
      name: 'د. أحمد',
      specialty: 'القلبية',
      governorate: 'دمشق',
      area: 'المزة',
      profileImage: 'https://example.com/doctor.jpg',
      email: 'doctor@example.com',
      interests: ['القلبية', 'الضغط'],
      workingHours: {
        sat: ['09:00-17:00'],
      },
    });
  });
});
