import { AreaDto } from './area.dto';
import { SpecialtyDto } from './specialty.dto';
import { WorkingHoursDto } from './working-hours.dto';
import { PaginatedResponseDto } from './pagination.dto';

export interface MedicalCenterApiDto {
  id: number;
  name: string;
  type: string;
  address: string | null;
  map_url: string | null;
  phone: string | null;
  mobile: string | null;
  whatsapp: string | null;
  about: string | null;
  image: string | null;
  workingHours: WorkingHoursDto[];
  specialties: SpecialtyDto[];
  area: AreaDto;
}

export type MedicalCentersApiResponse  = PaginatedResponseDto<MedicalCenterApiDto>;

