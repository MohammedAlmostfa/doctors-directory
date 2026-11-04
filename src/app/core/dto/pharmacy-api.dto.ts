
import { AreaDto } from './area.dto';
import { WorkingHoursDto } from './working-hours.dto';
import { PaginatedResponseDto } from './pagination.dto';

export interface PharmacyApiDto {
  id: number;
  name: string;
  address: string | null;
  map_url: string | null;
  phone: string | null;
  mobile: string | null;
  whatsapp: string | null;
  about: string | null;
  image: string | null;

  workingHours: WorkingHoursDto[];
  area: AreaDto;
}

export type PharmaciesApiResponse = PaginatedResponseDto<PharmacyApiDto>;
