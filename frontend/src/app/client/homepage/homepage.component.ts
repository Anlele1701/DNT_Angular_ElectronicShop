import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  parallaxElements: NodeListOf<Element>;

  constructor(private renderer: Renderer2){}
  ngOnInit() {
    this.parallaxElements = document.querySelectorAll(".parallax_scrolling");
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    for (let i = 0; i < this.parallaxElements.length; i++) {
      const element = this.parallaxElements[i] as HTMLElement;
      const bounding = element.getBoundingClientRect();
      const offset = bounding.top / window.innerHeight;
      const speed = 0.5;
  
      const prlLeft = element.querySelector(".prl-left") as HTMLElement;
      const prlRight = element.querySelector(".prl-right") as HTMLElement;
  
      this.renderer.setStyle(prlLeft, 'transform', `translateX(${offset * speed * 100}%)`);
      this.renderer.setStyle(prlRight, 'transform', `translateX(${-offset * speed * 100}%)`);
    }
  }
}
