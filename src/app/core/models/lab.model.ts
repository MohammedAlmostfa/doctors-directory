import { PlaceBase } from './place.model';

export interface Lab extends PlaceBase {
  homeVisit: boolean;
  about?: string | null;
  mobile?: string | null;
  whatsapp?: string | null;
  email?: string | null;
}
