import { SpecialtyDto } from './specialty.dto';
import { AreaDto } from './area.dto';
import { WorkingHoursDto } from './working-hours.dto';
import { PaginatedResponseDto } from './pagination.dto';
export interface DoctorApiDto {
  id: number;
  name: string;
  address: string | null;
  map_url: string | null;
  phone: string | null;
  mobile: string | null;
  whatsapp: string | null;
  email?: string | null;
  experience_years: number | null;
  about: string | null;
  profile_image: string | null;
  interests?: string[] | null;

  specialty: SpecialtyDto;
  area: AreaDto;

  workingHours: WorkingHoursDto[];
}


export type DoctorsApiResponse =
  PaginatedResponseDto<DoctorApiDto>;
