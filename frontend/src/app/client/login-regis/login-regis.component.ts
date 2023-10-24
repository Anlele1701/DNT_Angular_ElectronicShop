import { Component ,ViewChild} from '@angular/core';

@Component({
  selector: 'app-login-regis',
  templateUrl: './login-regis.component.html',
  styleUrls: ['./login-regis.component.css']
})
export class LoginRegisComponent {
  @ViewChild('container') container: any;
  constructor(){}
  ngAfterViewInit(){
    const overlayBtn = this.container.nativeElement.querySelector('.overlayBtn');
    const overLayCon = this.container.nativeElement.querySelector('.overlayCon')
    overlayBtn.addEventListener('click', () => {
      this.container.nativeElement.classList.toggle('right-panel-active');
      overlayBtn.classList.remove('btnScaled');
      window.requestAnimationFrame(()=>{
        overlayBtn.classList.add('btnScaled')
      })
    });
  }
}
