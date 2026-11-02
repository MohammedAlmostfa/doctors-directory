import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SPECIALTIES } from '../../../core/constants/specialties';
import { CentersService } from '../../../core/services/centers.service';
import { ClockService } from '../../../core/services/clock.service';
import { DoctorsService } from '../../../core/services/doctors.service';
import { LabsService } from '../../../core/services/labs.service';
import { PharmaciesService } from '../../../core/services/pharmacies.service';
import { PlaceCardComponent } from '../../../shared/components/place-card/place-card.component';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { getOpeningStatus, is24Hours } from '../../../shared/utils/working-hours';
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
  private centers = inject(CentersService);
  private labs = inject(LabsService);

  readonly specialties = SPECIALTIES;
  readonly is24 = is24Hours;

  // الأعداد من الخدمات نفسها: لما توصل الـ API بتصير حقيقية بدون تعديل بالقالب
  readonly services = computed<ServiceItem[]>(() => [
    {
      icon: 'stethoscope', title: 'الأطباء', path: '/doctors',
      description: 'ابحث بين الأطباء حسب التخصص والمدينة، واطّلع على عنوان العيادة وساعات الدوام.',
      count: `${this.doctors.doctors().length} طبيب`,
    },
    {
      icon: 'local_pharmacy', title: 'الصيدليات', path: '/pharmacies',
      description: 'اعرف أي الصيدليات مفتوحة الآن، وأيها تعمل على مدار الساعة.',
      count: `${this.pharmacies.getAll().length} صيدلية`,
    },
    {
      icon: 'local_hospital', title: 'المراكز الطبية', path: '/centers',
      description: 'مشافٍ ومراكز طبية ومجمعات عيادات مع تخصصاتها وأرقام التواصل.',
      count: `${this.centers.getAll().length} مركز`,
    },
    {
      icon: 'biotech', title: 'المخابر', path: '/labs',
      description: 'مخابر تحاليل قريبة منك، مع معرفة توفر خدمة سحب العينات من المنزل.',
      count: `${this.labs.getAll().length} مخبر`,
    },
  ]);

  ngOnInit(): void {
    this.doctors.load();
  }

  // أول 3 صيدليات مفتوحة. بتتحدّث لحالها كل دقيقة لأنها تعتمد على الـ Signal تبع الساعة
  openPharmacies = computed(() => {
    const now = this.clock.minutes();
    return this.pharmacies.getAll().filter(p => getOpeningStatus(p.ranges, now).open).slice(0, 3);
  });
}
