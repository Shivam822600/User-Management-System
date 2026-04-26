import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { CameraComponent } from './dashboard/camera.component';
import { UserManagementComponent } from './admin/user-management.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: CameraComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'admin', 
    component: UserManagementComponent, 
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] } 
  },
  // redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
