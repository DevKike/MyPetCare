import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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

  constructor(private readonly _navCtrl: NavController) {}

  ngAfterViewInit(): void {
    const swiperElement = this.swiperRef.nativeElement;
    this.swiperInstance = swiperElement.swiper;
  }

  slideNext() {
    if (this.swiperInstance) {
      this.swiperInstance.slideNext();
    }
  }

  isLastSlide(): boolean {
    if (this.swiperInstance) {
      return this.swiperInstance.activeIndex === this.swiperInstance.slides.length - 1;
    }
    return false;
  }

  doNavigate() {
    this._navCtrl.navigateForward('/principal')
  }
}
