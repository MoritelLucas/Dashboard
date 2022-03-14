import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import { WeatherWidgetsComponent } from './components/weather-widgets/weather-widgets/weather-widgets.component';
import { RedditlogComponent } from './components/redditlog/redditlog.component';
import { CurrencyWidgetComponent } from './components/currency-widget/currency-widget/currency-widget.component';
import { YoutubeWidgetComponent } from './components/youtube-widget/youtube-widget/youtube-widget.component';
import { LocationWidgetsComponent } from './components/location-widget/location-widgets/location-widgets.component';
import { RedditWidgetComponent } from './components/reddit-widget/reddit-widget/reddit-widget.component';
import { YoutubeSearchWidgetComponent } from './components/youtubeSearch-widget/youtube-search-widget/youtube-search-widget.component';
import { TimeWidgetsComponent } from './components/time-widgets/time-widgets.component';
import { SearchWidgetComponent } from './components/reddit-widget/search-widget/search-widget.component';
import { PostsWidgetComponent } from './components/reddit-widget/posts-widget/posts-widget.component';
import { MysubWidgetComponent } from './components/reddit-widget/mysub-widget/mysub-widget.component';
import { RiotsummonerComponent } from './components/riotsum-widget/riotsum-widget.component';
import { RiotmatchWidgetComponent } from './components/riotmatch-widget/riotmatch-widget.component';
import { NasaWidgetComponent } from './components/nasa-widget/nasa-widget.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    WeatherWidgetsComponent,
    RedditlogComponent,
    LocationWidgetsComponent,
    CurrencyWidgetComponent,
    YoutubeWidgetComponent,
    RedditWidgetComponent,
    YoutubeSearchWidgetComponent,
    TimeWidgetsComponent,
    SearchWidgetComponent,
    PostsWidgetComponent,
    MysubWidgetComponent,
    RiotsummonerComponent,
    RiotmatchWidgetComponent,
    NasaWidgetComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSliderModule,
    MatToolbarModule,
    MatTreeModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressBarModule,
    MatTabsModule,
    HttpClientModule,
    DragDropModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule
  ]
})
export class PublicModule { }
