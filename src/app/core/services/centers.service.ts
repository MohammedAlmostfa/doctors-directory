import { Injectable } from '@angular/core';
import { MedicalCenter } from '../models/center.model';

@Injectable({ providedIn: 'root' })
export class CentersService {
  // بيانات تجريبية. لاحقاً: HttpClient.get<MedicalCenter[]>('/api/centers')
  private readonly data: MedicalCenter[] = [
    { id: 1, name: 'مشفى الشام التخصصي', type: 'مشفى', city: 'دمشق', area: 'المزة', address: 'أوتستراد المزة', phone: '011 555 0501', specialties: ['الباطنية', 'الجراحة العامة', 'القلبية', 'الإسعاف'], ranges: ['00:00-24:00'] },
    { id: 2, name: 'مركز الأمل الطبي', type: 'مركز طبي', city: 'دمشق', area: 'أبو رمانة', address: 'شارع الشعلان', phone: '011 555 0502', specialties: ['الأطفال', 'النسائية', 'الجلدية'], ranges: ['08:00-20:00'] },
    { id: 3, name: 'مجمع عيادات النور', type: 'مجمع عيادات', city: 'حلب', area: 'الفرقان', address: 'شارع الفرقان الرئيسي', phone: '021 555 0503', specialties: ['العيون', 'الأذن والأنف والحنجرة', 'الأسنان'], ranges: ['09:00-14:00', '17:00-21:00'] },
    { id: 4, name: 'مشفى الحياة', type: 'مشفى', city: 'حلب', area: 'العزيزية', address: 'قرب دوار العزيزية', phone: '021 555 0504', specialties: ['الجراحة العامة', 'العظمية', 'الأطفال', 'الإسعاف'], ranges: ['00:00-24:00'] },
    { id: 5, name: 'مركز السلام للأشعة', type: 'مركز أشعة', city: 'حمص', area: 'الإنشاءات', address: 'شارع الإنشاءات', phone: '031 555 0505', specialties: ['الأشعة السينية', 'الإيكو', 'الطبقي المحوري'], ranges: ['08:00-18:00'] },
    { id: 6, name: 'مركز الرحمة الطبي', type: 'مركز طبي', city: 'اللاذقية', area: 'الزراعة', address: 'شارع الزراعة', phone: '041 555 0506', specialties: ['الباطنية', 'الغدد', 'التغذية'], ranges: ['08:00-19:00'] },
    { id: 7, name: 'مجمع عيادات الوفاء', type: 'مجمع عيادات', city: 'حماة', area: 'الحاضر', address: 'شارع الحاضر', phone: '033 555 0507', specialties: ['النسائية', 'الأسنان', 'الجلدية'], ranges: ['09:00-20:00'] },
    { id: 8, name: 'مشفى البشائر', type: 'مشفى', city: 'طرطوس', area: 'الكورنيش', address: 'الكورنيش الغربي', phone: '043 555 0508', specialties: ['الباطنية', 'القلبية', 'الإسعاف'], ranges: ['00:00-24:00'] },
    { id: 9, name: 'مركز الياسمين الطبي', type: 'مركز طبي', city: 'دمشق', area: 'كفرسوسة', address: 'قرب المركز الثقافي', phone: '011 555 0509', specialties: ['الأطفال', 'العصبية', 'الفيزيائي'], ranges: ['08:00-20:00'] },
  ];

  getAll(): MedicalCenter[] {
    return this.data;
  }

  getById(id: number): MedicalCenter | undefined {
    return this.data.find(center => center.id === id);
  }
}
