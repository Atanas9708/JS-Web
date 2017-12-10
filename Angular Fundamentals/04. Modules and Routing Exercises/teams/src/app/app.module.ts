import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutesModule } from './app-routes.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthHomeComponent } from './components/auth-home/auth-home.component';
import { AttackComponent } from './components/attack/attack.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

import { AttackGuard } from './guards/attack-guard.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthHomeComponent,
    AttackComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
  ],
  providers: [AttackGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
