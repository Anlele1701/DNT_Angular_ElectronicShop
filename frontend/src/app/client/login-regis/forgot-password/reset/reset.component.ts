import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from './confirmPasswordValidator';
import { UserServiceService } from 'src/app/services/userService/user-service.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  formBuilder = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  constructor(private userService: UserServiceService) {}
  token: string;
  successMes = '';
  isSuccess = false;
  isShowNoti = false;
  reset() {
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password,
    };
    this.userService.resetPasswordService(resetObj).subscribe(
      (data: any) => {
        //console.log(data.message);
        this.isShowNoti = true;
        this.isSuccess = true;
        this.successMes = data.message;
      },
      (error: any) => {
        //console.log(error);
        //console.log(error.error);
        this.isShowNoti = true;
        this.isSuccess = false;
        this.successMes = error.error;
      }
    );
  }
  ngOnInit(): void {
    this.resetForm = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: confirmPasswordValidator('password', 'confirmPassword') }
    );

    this.activatedRoute.params.subscribe((val) => {
      this.token = val['tokenReset'];
      console.log('Token reset nè:', this.token);
    });
  }
}
