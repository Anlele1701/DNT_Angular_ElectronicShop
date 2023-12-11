import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { API } from 'src/app/services/API.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [API]
})
export class HomepageComponent implements OnInit {
  parallaxElements: NodeListOf<Element>;
  url: string = '';

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private api:API
  ) {}

  ngOnInit() {
    this.parallaxElements = document.querySelectorAll('.parallax_scrolling');
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    for (let i = 0; i < this.parallaxElements.length; i++) {
      const element = this.parallaxElements[i] as HTMLElement;
      const bounding = element.getBoundingClientRect();
      const offset = bounding.top / window.innerHeight;
      const speed = 0.5;

      const prlLeft = element.querySelector('.prl-left') as HTMLElement;
      const prlRight = element.querySelector('.prl-right') as HTMLElement;

      this.renderer.setStyle(
        prlLeft,
        'transform',
        `translateX(${offset * speed * 100}%)`
      );
      this.renderer.setStyle(
        prlRight,
        'transform',
        `translateX(${-offset * speed * 100}%)`
      );
    }
  }

  //sản phẩm
  toProductDetail(idSP, tenSP, loaiSP) {
    this.http.get(this.api.getAPI()+'/sanpham/getSP/'+idSP).subscribe((data:any)=>{
      this.router.navigate(['/client/category/' + loaiSP, tenSP], {
        queryParams: { product: JSON.stringify(data) },
      });
    })
  }

  //danh mục
  reloadCategory(loaiSP) {
    this.router.navigate(['/client/category', loaiSP]).then(() => {
      window.location.reload();
    });
  }

  //review
  onThanhToanMomoClick() {
    var momoEndpoint =
      'http://localhost:3800/payment/momo/656db7becb23bff5efb49d71';
    this.http.post(momoEndpoint, {}).subscribe(
      (data: any) => {
        console.log('Success:', data);
        window.location.href = data.payUrl;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
