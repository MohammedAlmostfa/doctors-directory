import { GovernorateDto } from './governorate.dto';

export interface AreaDto {
  id: number;
  name: string;
  governorate: GovernorateDto | null;
}
