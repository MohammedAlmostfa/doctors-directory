import { PlaceBase } from './place.model';

export interface MedicalCenter extends PlaceBase {
  type: string;
  specialties: string[];
  about?: string | null;
  mobile?: string | null;
  whatsapp?: string | null;
  email?: string | null;
}
