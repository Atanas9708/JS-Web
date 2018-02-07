import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { CreateComponent } from './components/animals/create/create.component';
import { ListComponent } from './components/animals/list/list.component';
import { SearchComponent } from './components/animals/search/search.component';
import { DetailsComponent } from './components/animals/details/details.component';
import { MineComponent } from './components/animals/mine/mine.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create', canActivate: [AuthGuard], component: CreateComponent },
  { path: 'list', component: ListComponent },
  { path: 'search', component: SearchComponent },
  { path: 'details/:id', canActivate: [AuthGuard], component: DetailsComponent },
  { path: 'mine', canActivate: [AuthGuard], component: MineComponent } 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule {  };