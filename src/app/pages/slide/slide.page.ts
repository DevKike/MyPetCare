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
    { text: 'Slide 1 ' },
    { text: 'Slide 2 ' },
    { text: 'Slide 3 ' },
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
