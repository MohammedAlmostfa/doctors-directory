import { AreaDto } from './area.dto';
import { WorkingHoursDto } from './working-hours.dto';

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

export interface PharmaciesApiResponse {
  data: PharmacyApiDto[];
}
