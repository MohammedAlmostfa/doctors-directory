import { DoctorApiDto } from '../dto/doctor-api.dto';
import { Doctor } from '../models/doctor.model';

export function mapDoctor(dto: DoctorApiDto): Doctor {
  return {
    id: dto.id,
    name: dto.name,

    specialty: dto.specialty.name,

    city: dto.area.governorate.name,
    area: dto.area.name,

    address: dto.address,
    mapUrl: dto.map_url,

    phone: dto.phone,
    mobile: dto.mobile,
    whatsapp: dto.whatsapp,

    experienceYears: dto.experience_years,
    about: dto.about,
    profileImage: dto.profile_image,
  };
}

export function mapDoctors(dtos: DoctorApiDto[]): Doctor[] {
  return dtos.map(mapDoctor);
}
