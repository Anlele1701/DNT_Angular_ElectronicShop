import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';

export function confirmPasswordValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    // Kiểm tra xem các trường có tồn tại không (ví dụ: khi khởi tạo form)
    if (!control || !matchingControl) {
      return null;
    }

    // So sánh giá trị của hai trường mật khẩu
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPassword: true });
      return { confirmPassword: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}
