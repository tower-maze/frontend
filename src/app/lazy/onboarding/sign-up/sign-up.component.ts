import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  @Override()
  public ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      },
      { validator: this.checkPasswords }
    );
  }

  public checkPasswords(group: FormGroup) {
    const pass = group.get('password');
    const confirmPass = group.get('confirmPassword');
    const valid = pass?.value === confirmPass?.value ? null : { notSame: true };
    confirmPass?.setErrors(valid);
    return valid;
  }

  public get email() {
    return this.signUpForm.get('email');
  }

  public get password() {
    return this.signUpForm.get('password');
  }

  public get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  public signUp() {
    console.log(this.signUpForm);
  }
}
