

import { Pharmacy } from '../models/pharmacy.model';
import { PharmacyApiDto } from '../dto/pharmacy-api.dto';
import { mapWorkingHours } from '../../shared/utils/working-hours';

export function mapPharmacy(dto: PharmacyApiDto): Pharmacy {
  const workingHours = mapWorkingHours(dto.workingHours ?? []);

  return {
    id: dto.id,
    name: dto.name,
    governorate: dto.area.governorate?.name ?? '',
    area: dto.area.name,
    address: dto.address,
    phone: dto.phone,
    mapUrl: dto.map_url,
    mobile: dto.mobile,
    whatsapp: dto.whatsapp,
    about: dto.about,
    ranges: [],
    workingHours,
  };
}

export function mapPharmacies(dtos: PharmacyApiDto[]): Pharmacy[] {
  return dtos.map(mapPharmacy);
}
