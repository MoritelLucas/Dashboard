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

import { HttpClientModule } from '@angular/common/http';
import { WeatherWidgetsComponent } from './components/weather-widgets/weather-widgets/weather-widgets.component';
import { LocationWidgetsComponent } from './components/location-widget/location-widgets/location-widgets.component';
import { CurrencyWidgetComponent } from './components/currency-widget/currency-widget/currency-widget.component';
import { YoutubeWidgetComponent } from './components/youtube-widget/youtube-widget/youtube-widget.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    WeatherWidgetsComponent,
    LocationWidgetsComponent,
    CurrencyWidgetComponent,
    YoutubeWidgetComponent
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
    DragDropModule
  ]
})
export class PublicModule { }
