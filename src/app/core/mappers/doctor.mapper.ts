import { DoctorApiDto } from '../dto/doctor-api.dto';
import { Doctor } from '../models/doctor.model';
import { mapWorkingHours } from './working-hours.mapper';

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
    email: dto.email ?? undefined,

    experienceYears: dto.experience_years,
    about: dto.about,
    profileImage: dto.profile_image,
    interests: dto.interests ?? undefined,
    workingHours: mapWorkingHours(dto.workingHours ?? []),
  };
}

export function mapDoctors(dtos: DoctorApiDto[]): Doctor[] {
  return dtos.map(mapDoctor);
}
