import { Component, OnInit, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';
import {WeatherService} from '../../services/weather.service' 
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { Widget } from '../../services/widget-factory.service';

export class weatherData {
  constructor(
    public city?: string,
    public temperature?:  string,
    public weather_descriptions?: string,
    public wind_speed ?: boolean,
    public wind_degree?: string,
    public wind_dir?: string,
    public pressure?: string,
    public precip?: string,
    public humidity?: string,
    public cloudcover?: string,
    public visibility?: string,
    public is_day?: string,
  )  {}
}
@Component({
  selector: 'app-weather-widgets',
  templateUrl: './weather-widgets.component.html',
  styleUrls: ['./weather-widgets.component.css']
})
export class WeatherWidgetsComponent implements OnInit {

  weather:weatherData[]=[];
  array: any[]=[];
  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>
  i =0;
  y = setInterval(() =>this.sendWeather(this.i), 300000);

  form: any[] =[]
  constructor(
    private WeatherService: WeatherService, 
    private formBuilder: FormBuilder,
    private _iterateDiff: IterableDiffers) {}

  ngDoCheck() {
    const changes = this._diff.diff(this.widgets);
    if (changes) {
      if(this.widgets.length > this.form.length)
        this.form.push(this.formBuilder.group({
          location:['',Validators.required]
      }))
    }
  }
  ngOnInit() {
    this._diff = this._iterateDiff.find(this.widgets).create();
  }

  deleteWidget(index:number) {
      clearInterval(this.y);
      this.widgets.splice(index, 1);
    }

  sendWeather(index:number) {
    this.WeatherService
        .getWeather(this.form[index].value.location)
        .subscribe(res => {this.weather[index] = JSON.parse(JSON.stringify(res))});
  }

}
