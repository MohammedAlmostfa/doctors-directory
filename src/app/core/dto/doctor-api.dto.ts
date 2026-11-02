import { SpecialtyDto } from './specialty.dto';
import { AreaDto } from './area.dto';
import { WorkingHoursDto } from './working-hours.dto';
export interface DoctorApiDto {
  id: number;
  name: string;
  address: string | null;
  map_url: string | null;
  phone: string | null;
  mobile: string | null;
  whatsapp: string | null;
  experience_years: number | null;
  about: string | null;
  profile_image: string | null;

  specialty: SpecialtyDto;
  area: AreaDto;

  workingHours: WorkingHoursDto[];
}

export interface DoctorsApiResponse {
  data: DoctorApiDto[];
}
