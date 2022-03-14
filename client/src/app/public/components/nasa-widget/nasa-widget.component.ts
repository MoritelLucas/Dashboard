import { Component, OnInit, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';
import {NasaserviceService} from '../services/nasaservice.service' 
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { Widget } from '../services/widget-factory.service';

export class nasaData {
  constructor(
    public earth_date?: string,
    public img_src?:  string,
  )  {}
}
@Component({
  selector: 'app-nasa-widget',
  templateUrl: './nasa-widget.component.html',
  styleUrls: ['./nasa-widget.component.css']
})
export class NasaWidgetComponent implements OnInit {

  nasa:nasaData[]=[];
  array: any[]=[];
  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>

  form: any[] =[]
  constructor(
    private NasaserviceService: NasaserviceService, 
    private formBuilder: FormBuilder,
    private _iterateDiff: IterableDiffers) {}

  ngDoCheck() {
    const changes = this._diff.diff(this.widgets);
    if (changes) {
      if(this.widgets.length > this.form.length)
        this.form.push(this.formBuilder.group({
          cam:['',Validators.required],
          sol:['',Validators.required]
      }))
    }
  }
  ngOnInit() {
    this._diff = this._iterateDiff.find(this.widgets).create();
  }

  deleteWidget(index:number) {
        this.widgets.splice(index, 1);
      }

  sendnasa(index:number) {
    this.NasaserviceService
        .getImage(this.form[index].value.sol, this.form[index].value.cam)
        .subscribe(res => {this.nasa[index] = JSON.parse(JSON.stringify(res))});
  }

}
