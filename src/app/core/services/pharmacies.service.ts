import { Injectable } from '@angular/core';
import { Pharmacy } from '../models/pharmacy.model';

@Injectable({ providedIn: 'root' })
export class PharmaciesService {
  // بيانات تجريبية. لاحقاً: HttpClient.get<Pharmacy[]>('/api/pharmacies')
  private readonly data: Pharmacy[] = [
    { id: 1, name: 'صيدلية الشفاء', city: 'دمشق', area: 'المزة', address: 'شارع الجلاء', phone: '011 555 0401', ranges: ['00:00-24:00'] },
    { id: 2, name: 'صيدلية الأمان', city: 'دمشق', area: 'أبو رمانة', address: 'شارع الشعلان', phone: '011 555 0402', ranges: ['08:00-23:00'] },
    { id: 3, name: 'صيدلية النور', city: 'حلب', area: 'الفرقان', address: 'شارع الفرقان الرئيسي', phone: '021 555 0403', ranges: ['08:00-14:00', '17:00-22:00'] },
    { id: 4, name: 'صيدلية الحياة', city: 'حلب', area: 'العزيزية', address: 'قرب دوار العزيزية', phone: '021 555 0404', ranges: ['00:00-24:00'] },
    { id: 5, name: 'صيدلية السلام', city: 'حمص', area: 'الإنشاءات', address: 'شارع الإنشاءات', phone: '031 555 0405', ranges: ['09:00-21:00'] },
    { id: 6, name: 'صيدلية الرحمة', city: 'اللاذقية', area: 'الزراعة', address: 'شارع الزراعة', phone: '041 555 0406', ranges: ['08:00-22:00'] },
    { id: 7, name: 'صيدلية الوفاء', city: 'حماة', area: 'الحاضر', address: 'شارع الحاضر', phone: '033 555 0407', ranges: ['08:00-20:00'] },
    { id: 8, name: 'صيدلية البشائر', city: 'طرطوس', area: 'الكورنيش', address: 'الكورنيش الغربي', phone: '043 555 0408', ranges: ['00:00-24:00'] },
    { id: 9, name: 'صيدلية الياسمين', city: 'دمشق', area: 'كفرسوسة', address: 'قرب المركز الثقافي', phone: '011 555 0409', ranges: ['08:00-23:00'] },
  ];

  getAll(): Pharmacy[] {
    return this.data;
  }

  getById(id: number): Pharmacy | undefined {
    return this.data.find(pharmacy => pharmacy.id === id);
  }
}
