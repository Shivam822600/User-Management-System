import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  template: `
    <h2 mat-dialog-title>Create New User</h2>
    <mat-dialog-content>
      <form [formGroup]="userForm" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" placeholder="John Doe">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" type="email" placeholder="john@example.com">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Password</mat-label>
          <input matInput formControlName="password" type="password">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Role</mat-label>
          <mat-select formControlName="role">
            <mat-option value="Admin">Admin</mat-option>
            <mat-option value="Supervisor">Supervisor</mat-option>
            <mat-option value="Worker">Worker</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="userForm.invalid" (click)="onSave()">Save User</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form { display: flex; flex-direction: column; gap: 10px; padding-top: 10px; min-width: 350px; }
    mat-form-field { width: 100%; }
  `]
})
export class UserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Worker', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
