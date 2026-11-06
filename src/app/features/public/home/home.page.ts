import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SPECIALTIES } from '../../../core/constants/specialties';
import { MedicalCentersService } from '../../../core/services/medical-centers.service';
import { ClockService } from '../../../core/services/clock.service';
import { DoctorsService } from '../../../core/services/doctors.service';
import { LabsService } from '../../../core/services/labs.service';
import { PharmaciesService } from '../../../core/services/pharmacies.service';
import { PlaceCardComponent } from '../../../shared/components/place-card/place-card.component';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { getWeeklyStatus, isWeekly24Hours } from '../../../core/utils/working-hours';
import { HomeCtaComponent } from './components/home-cta/home-cta.component';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ServiceCardsComponent, ServiceItem } from './components/service-cards/service-cards.component';
import { WhyUsComponent } from './components/why-us/why-us.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink, HomeHeroComponent, SectionHeadingComponent, ServiceCardsComponent, PlaceCardComponent,
    HowItWorksComponent, WhyUsComponent, HomeCtaComponent,
  ],
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit {
  private clock = inject(ClockService);
  private doctors = inject(DoctorsService);
  private pharmacies = inject(PharmaciesService);
  private centers = inject(MedicalCentersService);
  private labs = inject(LabsService);

  readonly specialties = SPECIALTIES;

  // الأعداد من الخدمات نفسها: لما توصل الـ API بتصير حقيقية بدون تعديل بالقالب
  readonly services = computed<ServiceItem[]>(() => [
    {
      icon: 'stethoscope', title: 'الأطباء', path: '/doctors',
      description: 'ابحث بين الأطباء حسب التخصص والمدينة، واطّلع على عنوان العيادة وساعات الدوام.',
      count: this.countLabel(
        this.doctors.doctors().length,
        this.doctors.loaded(),
        this.doctors.loading(),
        this.doctors.error(),
        'طبيب',
      ),
    },
    {
      icon: 'local_pharmacy', title: 'الصيدليات', path: '/pharmacies',
      description: 'اعرف أي الصيدليات مفتوحة الآن، وأيها تعمل على مدار الساعة.',
      count: this.countLabel(
        this.pharmacies.getAll().length,
        this.pharmacies.loaded(),
        this.pharmacies.loading(),
        this.pharmacies.error(),
        'صيدلية',
      ),
    },
    {
      icon: 'local_hospital', title: 'المراكز الطبية', path: '/centers',
      description: 'مشافٍ ومراكز طبية ومجمعات عيادات مع تخصصاتها وأرقام التواصل.',
      count: this.countLabel(
        this.centers.getAll().length,
        this.centers.loaded(),
        this.centers.loading(),
        this.centers.error(),
        'مركز',
      ),
    },
    {
      icon: 'biotech', title: 'المخابر', path: '/labs',
      description: 'مخابر تحاليل قريبة منك، مع معرفة توفر خدمة سحب العينات من المنزل.',
      count: this.countLabel(
        this.labs.getAll().length,
        this.labs.loaded(),
        this.labs.loading(),
        this.labs.error(),
        'مخبر',
      ),
    },
  ]);

  ngOnInit(): void {
    this.doctors.load();
    this.pharmacies.load();
    this.centers.load();
    this.labs.load();
  }

  private countLabel(
    count: number,
    loaded: boolean,
    loading: boolean,
    error: string | null,
    noun: string,
  ): string {
    if (error) return 'تعذر التحميل';
    if (!loaded || loading) return 'جارٍ التحميل…';
    return `${count} ${noun}`;
  }

  readonly openPharmacies = computed(() => {
    const { dow, minutes } = this.clock.now();
    return this.pharmacies.getAll()
      .filter(pharmacy => getWeeklyStatus(pharmacy.workingHours, dow, minutes).open)
      .slice(0, 3);
  });

  readonly is24 = isWeekly24Hours;
}
