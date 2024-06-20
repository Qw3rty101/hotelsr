import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './auth/auth.guard';
import { AuthRedirectGuard } from './guards/auth-redirect.guard';
import { AuthGuard } from './guards/auth.guard';
import { TabsComponent } from './pages/components/tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    canActivate: [AuthGuard],
    children: [
      {
      path: "",
      redirectTo: "dashboard",
      pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'order',
        loadChildren: () => import('./pages/order/order.module').then( m => m.OrderPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'room',
        loadChildren: () => import('./admin/room/room.module').then( m => m.RoomPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        loadChildren: () => import('./admin/user/user.module').then( m => m.UserPageModule),
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./auth/sign-in/sign-in.module').then( m => m.SignInPageModule),
    canActivate: [AuthRedirectGuard]
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./auth/sign-up/sign-up.module').then( m => m.SignUpPageModule),
    canActivate: [AuthRedirectGuard]
  },
  {
    path: 'auth',
    canActivate: [AuthRedirectGuard],
    loadChildren: () => import('./auth/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./auth/welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate: [AuthRedirectGuard]
  },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
