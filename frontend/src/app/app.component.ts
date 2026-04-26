import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container class="sidenav-container" *ngIf="currentUser; else noAuth">
      <mat-sidenav mode="side" opened class="sidenav">
        <mat-toolbar color="primary">Menu</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/" routerLinkActive="active">
            <mat-icon matListIcon>camera</mat-icon> Camera Capture
          </a>
          <a mat-list-item routerLink="/admin" routerLinkActive="active" *ngIf="currentUser.user.role === 'Admin'">
            <mat-icon matListIcon>people</mat-icon> User Management
          </a>
          <mat-divider></mat-divider>
          <a mat-list-item (click)="logout()">
            <mat-icon matListIcon>logout</mat-icon> Logout
          </a>
        </mat-nav-list>
      </mat-sidenav>
      
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>User Management App</span>
          <span class="spacer"></span>
          <span>Logged in as: {{ currentUser.user.name }} ({{ currentUser.user.role }})</span>
        </mat-toolbar>
        
        <div class="content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>

    <ng-template #noAuth>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [`
    .sidenav-container { height: 100vh; }
    .sidenav { width: 250px; }
    .spacer { flex: 1 1 auto; }
    .content { padding: 20px; }
    .active { background: rgba(0, 0, 0, 0.04); color: #3f51b5; }
  `]
})
export class AppComponent {
  currentUser: any;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((user: any) => this.currentUser = user);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
