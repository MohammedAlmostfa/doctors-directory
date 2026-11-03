import { DoctorApiDto } from '../dto/doctor-api.dto';
import { Doctor } from '../models/doctor.model';
import { WEEK_DAYS, WeeklySchedule } from '../constants/week-days';
import { WorkingHoursDto } from '../dto/working-hours.dto';

import { mapWorkingHours } from '../../shared/utils/working-hours';
export function mapDoctor(dto: DoctorApiDto): Doctor {
  return {
    id: dto.id,
    name: dto.name,

    specialty: dto.specialty.name,

    governorate: dto.area.governorate?.name ?? '',
    area: dto.area.name,

    address: dto.address,
    mapUrl: dto.map_url,

    phone: dto.phone,
    mobile: dto.mobile,
    whatsapp: dto.whatsapp,

    experienceYears: dto.experience_years,
    about: dto.about,
    profileImage: dto.profile_image,
    workingHours: mapWorkingHours(dto.workingHours ?? []),
  };
}

export function mapDoctors(dtos: DoctorApiDto[]): Doctor[] {
  return dtos.map(mapDoctor);
}

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
}
