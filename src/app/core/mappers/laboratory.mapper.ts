import { Lab } from '../models/lab.model';
import { LaboratoryApiDto } from '../dto/laboratory-api.dto';
import { mapWorkingHours } from '../../shared/utils/working-hours';

export function mapLaboratory(dto: LaboratoryApiDto): Lab {
  return {
    id: dto.id,
    name: dto.name,
    governorate: dto.area.governorate?.name ?? '',
    area: dto.area.name,
    address: dto.address,
    phone: dto.phone,
    mobile: dto.mobile,
    whatsapp: dto.whatsapp,
    about: dto.description,
    mapUrl: dto.map_url,
    homeVisit: dto.home_visit,
    workingHours: mapWorkingHours(dto.workingHours ?? []),
  };
}

export function mapLaboratories(dtos: LaboratoryApiDto[]): Lab[] {
  return dtos.map(mapLaboratory);
}
