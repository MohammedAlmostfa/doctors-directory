import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { sixDays } from '../utils/schedule';

@Injectable({ providedIn: 'root' })
export class DoctorsService {
  // بيانات تجريبية. لاحقاً: HttpClient.get<Doctor[]>('/api/doctors')
  private readonly data: Doctor[] = [
    { id: 1, name: 'د. أحمد الخطيب', specialty: 'الباطنية', city: 'دمشق', area: 'المزة', address: 'شارع الجلاء، بناء الشفاء', phone: '011 555 0101', experienceYears: 15, schedule: sixDays(['09:00-15:00']) },
    {
      id: 2, name: 'د. ليلى الحلبي', specialty: 'الأطفال', city: 'دمشق', area: 'المزة',
      address: 'شارع الجلاء، بناء 12، الطابق الثاني، مقابل صيدلية الشفاء',
      phone: '011 555 0142', experienceYears: 12,
      about: 'أخصائية في طب الأطفال وحديثي الولادة، خبرة تزيد على 12 عاماً في متابعة نمو الأطفال والأمراض الشائعة والتلقيحات. تستقبل المرضى من عمر يوم حتى 14 عاماً.',
      interests: ['طب حديثي الولادة', 'جدول اللقاحات الوطنية', 'متابعة النمو والتغذية', 'أمراض الأطفال الشائعة'],
      mobile: '0999 555 014', whatsapp: '963999555014', email: 'l.halabi@clinic.example',
      schedule: {
        sat: ['10:00-15:00'], sun: ['10:00-15:00'], mon: ['10:00-15:00'],
        tue: ['10:00-13:00', '17:00-20:00'],
        wed: ['10:00-15:00'], thu: ['10:00-13:00'], fri: [],
      },
    },
    { id: 3, name: 'د. سامر العلي', specialty: 'القلبية', city: 'حلب', area: 'الفرقان', address: 'شارع الفرقان الرئيسي', phone: '021 555 0103', experienceYears: 20, schedule: sixDays(['10:00-14:00', '17:00-20:00']) },
    { id: 4, name: 'د. ريما ديب', specialty: 'النسائية والتوليد', city: 'حمص', area: 'الإنشاءات', address: 'شارع الإنشاءات', phone: '031 555 0104', experienceYears: 9, schedule: sixDays(['09:00-14:00']) },
    { id: 5, name: 'د. فادي منصور', specialty: 'العظمية', city: 'اللاذقية', area: 'الزراعة', address: 'شارع الزراعة', phone: '041 555 0105', experienceYears: 14, schedule: sixDays(['16:00-21:00']) },
    { id: 6, name: 'د. هالة سليمان', specialty: 'الجلدية', city: 'دمشق', area: 'كفرسوسة', address: 'قرب المركز الثقافي', phone: '011 555 0106', experienceYears: 8, schedule: sixDays(['10:00-18:00']) },
    { id: 7, name: 'د. نبيل إبراهيم', specialty: 'العيون', city: 'حماة', area: 'الحاضر', address: 'شارع الحاضر', phone: '033 555 0107', experienceYears: 18, schedule: sixDays(['09:00-13:00', '16:00-19:00']) },
    { id: 8, name: 'د. دانا يوسف', specialty: 'الأسنان', city: 'طرطوس', area: 'الكورنيش', address: 'الكورنيش الغربي', phone: '043 555 0108', experienceYears: 6, schedule: sixDays(['10:00-19:00']) },
    { id: 9, name: 'د. كريم شاهين', specialty: 'العصبية', city: 'حلب', area: 'العزيزية', address: 'قرب دوار العزيزية', phone: '021 555 0109', experienceYears: 11, schedule: sixDays(['11:00-17:00']) },
  ];

  getAll(): Doctor[] {
    return this.data;
  }

  getById(id: number): Doctor | undefined {
    return this.data.find(doctor => doctor.id === id);
  }
}
