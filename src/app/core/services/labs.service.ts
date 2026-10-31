import { Injectable } from '@angular/core';
import { Lab } from '../models/lab.model';

@Injectable({ providedIn: 'root' })
export class LabsService {
  // بيانات تجريبية. لاحقاً بتتبدّل بـ HttpClient.get<Lab[]>('/api/labs')
  private readonly data: Lab[] = [
    { id: 1, name: 'مخبر الشفاء للتحاليل', city: 'دمشق', area: 'المزة', address: 'شارع الجلاء', phone: '011 555 0301', homeVisit: true, ranges: ['07:00-19:00'] },
    { id: 2, name: 'مخبر الأمل الطبي', city: 'دمشق', area: 'أبو رمانة', address: 'شارع الشعلان', phone: '011 555 0302', homeVisit: true, ranges: ['07:00-20:00'] },
    { id: 3, name: 'مخبر النور', city: 'حلب', area: 'الفرقان', address: 'شارع الفرقان الرئيسي', phone: '021 555 0303', homeVisit: false, ranges: ['07:30-18:00'] },
    { id: 4, name: 'مخبر الحياة', city: 'حلب', area: 'العزيزية', address: 'قرب دوار العزيزية', phone: '021 555 0304', homeVisit: true, ranges: ['07:00-19:00'] },
    { id: 5, name: 'مخبر السلام', city: 'حمص', area: 'الإنشاءات', address: 'شارع الإنشاءات', phone: '031 555 0305', homeVisit: false, ranges: ['08:00-17:00'] },
    { id: 6, name: 'مخبر الرحمة', city: 'اللاذقية', area: 'الزراعة', address: 'شارع الزراعة', phone: '041 555 0306', homeVisit: true, ranges: ['07:00-18:00'] },
    { id: 7, name: 'مخبر الوفاء', city: 'حماة', area: 'الحاضر', address: 'شارع الحاضر', phone: '033 555 0307', homeVisit: false, ranges: ['08:00-16:00'] },
    { id: 8, name: 'مخبر البشائر', city: 'طرطوس', area: 'الكورنيش', address: 'الكورنيش الغربي', phone: '043 555 0308', homeVisit: true, ranges: ['07:00-19:00'] },
    { id: 9, name: 'مخبر الياسمين', city: 'دمشق', area: 'كفرسوسة', address: 'قرب المركز الثقافي', phone: '011 555 0309', homeVisit: true, ranges: ['07:30-20:00'] },
  ];

  getAll(): Lab[] {
    return this.data;
  }

  getById(id: number): Lab | undefined {
    return this.data.find(lab => lab.id === id);
  }
}
