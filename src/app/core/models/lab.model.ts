
export interface Lab   {
  homeVisit: boolean;   // سحب
    id: number;
    name: string;
    governorate: string;
    area: string;
    address: string | null;
    phone: string | null;
    mapUrl?: string | null;
    ranges: string[];


      about?: string | null;
    mobile?: string | null;
    whatsapp?: string | null;
    email?: string | null;
}
export interface LabFilters {
  q: string;
  governorate: string;
  openNow: boolean;
  homeVisit: boolean;
}
