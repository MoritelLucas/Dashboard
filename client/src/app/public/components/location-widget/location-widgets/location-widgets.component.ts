import { Component, OnInit, Input, IterableDiffer, IterableDiffers} from '@angular/core';
import {LocationService} from '../../services/location.service' 
import { FormBuilder, Validators } from '@angular/forms';
import { Widget } from '../../services/widget-factory.service';

export class locationData {
  constructor(
    public city?: string,
    public country?:  string,
    public lat?: string,
    public lon ?: boolean,
    public timezone_id?: string,
  )  {}
}
@Component({
  selector: 'app-location-widgets',
  templateUrl: './location-widgets.component.html',
  styleUrls: ['./location-widgets.component.css']
})
export class LocationWidgetsComponent implements OnInit {

  location:locationData[]=[];
  array: any[]=[];
  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>

  form: any[] =[]
  constructor(
    private LocationService: LocationService, 
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
    this.widgets.splice(index, 1);
  }

  sendLocation(index:number) {
    this.LocationService
        .getLocation(this.form[index].value.location)
        .subscribe(res => {this.location[index] = JSON.parse(JSON.stringify(res))});
  }
}
