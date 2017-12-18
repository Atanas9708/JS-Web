// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from './components/authentication/auth.module';
import { SharedModule } from './components/shared/shared.module';
import { ServiceModule } from './services/services.module';
import { AppRoutesModule } from './app-routes.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { PostGuard } from './guards/post.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutesModule,
    AuthModule,
    SharedModule,
    ServiceModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    AuthGuard,
    PostGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
