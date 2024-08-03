import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';
import { passwordComplexityValidator } from './CustomPasswordValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;
  isSubmitted = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          passwordComplexityValidator(),
        ],
      ],
    });
  }

  get controlFun() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = null;

    if (this.form.invalid) {
      return;
    }

    this.registrationService.register(this.form.value).subscribe(
      (response) => {
        // console.log('Registration successful', response);
        alert('Successful');
      },
      (error) => {
        console.error('Failed', error);
        this.errorMessage = error;
      }
    );

  }
}
