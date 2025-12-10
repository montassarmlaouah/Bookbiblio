import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { BookListComponent } from './components/books/book-list.component';
import { BookDetailComponent } from './components/books/book-detail.component';
import { BookFormComponent } from './components/books/book-form.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'books', component: BookListComponent, canActivate: [authGuard] },
  { path: 'books/create', component: BookFormComponent, canActivate: [authGuard] },
  { path: 'books/edit/:id', component: BookFormComponent, canActivate: [authGuard] },
  { path: 'books/:id', component: BookDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
