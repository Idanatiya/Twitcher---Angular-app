import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './cmps/game-list/game-list.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactResolverService } from './services/contact-resolver.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { StreamListComponent } from './pages/stream-list/stream-list.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TwitchAppComponent } from './pages/twitch-app/twitch-app.component';
import { AuthGuard } from './guards/auth.guard';








const routes: Routes = [
 
  {path: 'twitch-app',
   component: TwitchAppComponent,
   canActivate: [AuthGuard],
    children: 
    [
      { path: 'contact/edit/:id', component: ContactEditComponent, resolve: { contact: ContactResolverService } },
      { path: 'contact/edit', component: ContactEditComponent },
      { path: 'game/:id', component: StreamListComponent },
      {path: 'profile/:id', component: UserProfileComponent },
      { path: 'contacts/:id', component: ContactDetailsComponent, resolve: { contact: ContactResolverService }, runGuardsAndResolvers: "paramsChange" },
      { path: 'about', component: AboutComponent },
      { path: 'contacts', component: ContactPageComponent },
      { path: 'about', component: AboutComponent },
      {path: '', component: GameListComponent},
    ]
  },
  {path: 'signup', component: SignupPageComponent},
  {path: '', component: HomepageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
