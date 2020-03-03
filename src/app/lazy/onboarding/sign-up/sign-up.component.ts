import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Register } from '../../../shared/store/auth/auth.actions';

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
        username: ['', [Validators.required, Validators.minLength(6)]],
        password1: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required, Validators.minLength(6)]]
      },
      { validator: this.checkPasswords }
    );
  }

  public checkPasswords(group: FormGroup) {
    const pass = group.get('password1');
    const confirmPass = group.get('password2');
    const valid = pass?.value === confirmPass?.value ? null : { notSame: true };
    confirmPass?.setErrors(valid);
    return valid;
  }

  public get email() {
    return this.signUpForm.get('email');
  }

  public get username() {
    return this.signUpForm.get('username');
  }

  public get password() {
    return this.signUpForm.get('password1');
  }

  public get confirmPassword() {
    return this.signUpForm.get('password2');
  }

  @Dispatch()
  public signUp = () => new Register(this.signUpForm.value);
}
