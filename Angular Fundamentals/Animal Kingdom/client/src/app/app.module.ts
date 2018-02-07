import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutesModule } from './app-routes.module';
import { AuthModule } from './components/auth/auth.module';
import { ServiceModule } from './services/services.module';
import { AnimalModule } from './components/animals/animals.module';

import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutesModule,
    AuthModule,
    AnimalModule,
    ServiceModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
