import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements AfterViewInit {
  @ViewChild('swiper', { static: false }) swiperRef: any;

  swiperInstance?: Swiper;

  protected slides = [
    {
      title: 'Activity Tracking ',
      description: 'Manage  your pets ',
      img: '../../assets/slide1.png',
    },
    {
      title: 'Take control of your pets ',
      description: 'Add all the pets you want',
      img: '../../assets/slide2.png',
    },
    {
      title: 'Add your pets medical record ',
      description: 'save your pets vaccination card',
      img: '../../assets/slide3.png',
    },
  ];

  constructor(private readonly _navCtrl: NavController) {}

  ngAfterViewInit(): void {
    const swiperElement = this.swiperRef.nativeElement;
    this.swiperInstance = swiperElement.swiper;
  }

  protected slideNext() {
    if (this.swiperInstance) {
      this.swiperInstance.slideNext();
    }
  }

  protected isLastSlide(): boolean {
    if (this.swiperInstance) {
      return (
        this.swiperInstance.activeIndex ===
        this.swiperInstance.slides.length - 1
      );
    }
    return false;
  }

  protected doNavigate() {
    this._navCtrl.navigateForward('/principal');
  }
}
