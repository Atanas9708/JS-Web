import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthHomeComponent } from './components/auth-home/auth-home.component';
import { AttackComponent } from './components/attack/attack.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

import { AttackGuard } from './guards/attack-guard.guard';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/home' },
    { path: 'home', component: HomeComponent },
    { path: 'logged', component: AuthHomeComponent },
    { path: 'attack/:team', canActivate: [AttackGuard], component: AttackComponent },
    { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutesModule { };