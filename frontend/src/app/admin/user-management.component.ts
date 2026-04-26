import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserDialogComponent } from './user-dialog.component';

@Component({
  selector: 'app-user-management',
  template: `
    <div class="admin-container">
      <div class="header">
        <h1>User Management</h1>
        <button mat-raised-button color="primary" (click)="openCreateDialog()">
          <mat-icon>add</mat-icon> Create User
        </button>
      </div>

      <mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef> Name </mat-header-cell>
          <mat-cell *matCellDef="let user"> {{user.name}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="email">
          <mat-header-cell *matHeaderCellDef> Email </mat-header-cell>
          <mat-cell *matCellDef="let user"> {{user.email}} </mat-cell>
        </ng-container>

        <ng-container matColumnDef="role">
          <mat-header-cell *matHeaderCellDef> Role </mat-header-cell>
          <mat-cell *matCellDef="let user"> 
            <span class="role-badge" [ngClass]="user.role.toLowerCase()">{{user.role}}</span>
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef> Actions </mat-header-cell>
          <mat-cell *matCellDef="let user">
            <button mat-icon-button color="warn" (click)="deleteUser(user._id)" [disabled]="user.role === 'Admin'">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>

      <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons class="mat-elevation-z8"></mat-paginator>
    </div>
  `,
  styles: [`
    .admin-container { padding: 20px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .mat-table { width: 100%; }
    .mat-paginator { margin-top: 5px; }
    .role-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
    .admin { background: #fee2e2; color: #991b1b; }
    .supervisor { background: #fef3c7; color: #92400e; }
    .worker { background: #dcfce7; color: #166534; }
  `]
})
export class UserManagementComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService, 
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => this.snackBar.open('Failed to load users', 'Close', { duration: 3000 })
    });
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.snackBar.open('User deleted', 'Close', { duration: 3000 });
          this.loadUsers();
        },
        error: (err: any) => this.snackBar.open('Delete failed', 'Close', { duration: 3000 })
      });
    }
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.createUser(result).subscribe({
          next: () => {
            this.snackBar.open('User created successfully!', 'Close', { duration: 3000 });
            this.loadUsers();
          },
          error: (err: any) => this.snackBar.open('Create failed: ' + err.error.message, 'Close', { duration: 3000 })
        });
      }
    });
  }
}
