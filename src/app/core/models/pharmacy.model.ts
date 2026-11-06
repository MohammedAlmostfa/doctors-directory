
import { PlaceBase } from './place.model';

export interface Pharmacy extends PlaceBase {
  about?: string | null;
  mobile?: string | null;
  whatsapp?: string | null;
  email?: string | null;
}
