import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { AboutComponent } from './pages/about/about.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GameListComponent } from './cmps/game-list/game-list.component';
import { GamePreviewComponent } from './cmps/game-preview/game-preview.component';
import { StreamListComponent } from './pages/stream-list/stream-list.component';
import { StreamPreviewComponent } from './cmps/stream-preview/stream-preview.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { LoaderComponent } from './cmps/loader/loader.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { AvatarComponent } from './cmps/avatar/avatar.component';
import { DateDescPipe } from './pipes/date-desc.pipe';
import { FetchJsonPipe } from './pipes/fetch-json.pipe';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { TwitchAppComponent } from './pages/twitch-app/twitch-app.component';
import { TransferFundComponent } from './cmps/transfer-fund/transfer-fund.component';
import { MoveListComponent } from './cmps/move-list/move-list.component';
import { MoveItemComponent } from './cmps/move-item/move-item.component';
import { HomepageHeaderComponent } from './cmps/homepage-header/homepage-header.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AboutComponent,
    PageNotFoundComponent,
    GameListComponent,
    GamePreviewComponent,
    StreamListComponent,
    StreamPreviewComponent,
    ContactPageComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactFilterComponent,
    ContactDetailsComponent,
    LoaderComponent,
    ContactEditComponent,
    AvatarComponent,
    DateDescPipe,
    FetchJsonPipe,
    UserProfileComponent,
    SignupPageComponent,
    HomepageComponent,
    TwitchAppComponent,
    TransferFundComponent,
    MoveListComponent,
    MoveItemComponent,
    HomepageHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
