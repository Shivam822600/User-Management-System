import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-page">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
          <mat-card-subtitle>User Management & Camera App</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="admin@example.com">
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput [type]="hide ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button type="button" matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
                <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
            </mat-form-field>

            <button mat-raised-button color="primary" class="full-width login-btn" [disabled]="loading || loginForm.invalid">
              {{ loading ? 'Signing in...' : 'Sign In' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-page { display: flex; justify-content: center; align-items: center; height: 100vh; background: #f5f5f5; }
    .login-card { width: 100%; max-width: 400px; padding: 20px; }
    .full-width { width: 100%; margin-bottom: 15px; }
    .login-btn { height: 50px; font-weight: bold; margin-top: 10px; }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  hide = true;
  returnUrl: string = '/';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: (err: any) => {
          this.snackBar.open('Login failed: Invalid credentials', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
  }
}
