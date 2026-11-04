import { AreaDto } from './area.dto';
import { WorkingHoursDto } from './working-hours.dto';
import { PaginatedResponseDto } from './pagination.dto';

export interface LaboratoryServiceDto {
  id: number;
  name: string;
  description: string | null;
}

export interface LaboratoryApiDto {
  id: number;
  name: string;
  address: string | null;
  map_url: string | null;
  phone: string | null;
  mobile: string | null;
  whatsapp: string | null;
  description: string | null;
  image: string | null;
  home_visit: boolean;
  services: LaboratoryServiceDto[];
  workingHours: WorkingHoursDto[];
  area: AreaDto;
}

export type LaboratoriesApiResponse =
  PaginatedResponseDto<LaboratoryApiDto>;
