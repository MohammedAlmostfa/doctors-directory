import { MedicalCenter } from '../models/medical-center.model';
import { MedicalCenterApiDto } from '../dto/medical-center-api.dto';
import { CenterType } from '../constants/center-types';
import { mapWorkingHours } from './working-hours.mapper';

export function mapMedicalCenter(dto: MedicalCenterApiDto): MedicalCenter {
  return {
    id: dto.id,
    name: dto.name,
    type: dto.type,
    governorate: dto.area.governorate?.name ?? '',
    area: dto.area.name,
    address: dto.address,
    phone: dto.phone,
    mobile: dto.mobile,
    whatsapp: dto.whatsapp,
    about: dto.about,
    mapUrl: dto.map_url,
    specialties: dto.specialties.map(specialty => specialty.name),
    workingHours: mapWorkingHours(dto.workingHours ?? []),
  };
}

export function mapMedicalCenters(
  dtos: MedicalCenterApiDto[],
): MedicalCenter[] {
  return dtos.map(mapMedicalCenter);
}
