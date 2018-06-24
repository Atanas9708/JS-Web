import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutesModule } from './app-routes.module';
import { AuthModule } from './components/auth/auth.module';
import { AnimalModule } from './components/animals/animals.module';

import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ServiceModule } from './core/services/services.module';
import { StoreModule } from '@ngrx/store';
import { combineRootReducers } from './core/store/reducers/index';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './core/store/effects/auth.effects';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule .forRoot(),
    HttpClientModule,
    AppRoutesModule,
    StoreModule.forRoot(combineRootReducers),
    EffectsModule.forRoot([
      AuthEffects
    ]),
    AuthModule,
    AnimalModule,
    ServiceModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
