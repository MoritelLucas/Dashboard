import { Component, OnInit, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';
import {TimeService} from '../services/time.service' 
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { Widget } from '../services/widget-factory.service';

export class timeData {
  constructor(
    public city?: string,
    public hour?: string,
  )  {}
}
@Component({
  selector: 'app-time-widgets',
  templateUrl: './time-widgets.component.html',
  styleUrls: ['./time-widgets.component.css']
})
export class TimeWidgetsComponent implements OnInit {

  time:timeData[]=[];
  array: any[]=[];
  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>
  i = 0;
  y = setInterval(() =>this.sendTime(this.i), 3000);

  form: any[] =[]
  constructor(
    private TimeService: TimeService, 
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
      clearInterval(this.i);
        this.widgets.splice(index, 1);
      }

  sendTime(index:number) {
    this.i = index;
    this.TimeService
        .getWeather(this.form[index].value.location)
        .subscribe(res => {this.time [index] = JSON.parse(JSON.stringify(res))});
  }

}
