import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  mes = '';
  isFail = false;
  constructor(
    private router: Router,
    private userService: UserServiceService
  ) {}
  forgetForm: FormGroup;
  formBuilder = inject(FormBuilder);
  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }
  submit() {
    this.userService.sendEmailService(this.forgetForm.value.email).subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.message);
        this.mes = data.message;
        this.forgetForm.reset();
      },
      (error: any) => {
        console.log(error);
        console.log(error.error);
        this.mes = error.message;
        this.isFail = true;
      }
    );
  }
}
