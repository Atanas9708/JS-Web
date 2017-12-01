import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

//Components
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

//Services
import { AuthService } from './services/auth.service';
import { SearchService } from './services/search.service';
import { PokemonDetailService } from './services/pokemon-detail.service';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interecptor';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SearchComponent,
    TableComponent,
    PokemonDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    SearchService,
    PokemonDetailService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
