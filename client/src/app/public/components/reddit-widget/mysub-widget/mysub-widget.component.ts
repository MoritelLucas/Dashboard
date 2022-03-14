import { Component, OnInit, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';
import {RedditmysubService} from '../../services/redditmysub.service' 
import { FormBuilder, Validators } from '@angular/forms';
import { Widget } from '../../services/widget-factory.service';

export class mysubData {
  constructor(
    public name?: string,
    public subscribers?: string,
    public public_description?: string,
    public lang?: string,
    public url?: string,
    public banner_img?: string,
  )  {}
}

@Component({
  selector: 'app-mysub-widget',
  templateUrl: './mysub-widget.component.html',
  styleUrls: ['./mysub-widget.component.css']
})
export class MysubWidgetComponent implements OnInit {

  search: mysubData[]=[];
  i =0;
  y = setInterval(() =>this.sendmysubRE(this.i), 300);

  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>

  form: any[] =[]
  constructor(
    private RedditmysubService: RedditmysubService, 
    private formBuilder: FormBuilder,
    private _iterateDiff: IterableDiffers) {}

  ngDoCheck() {
    const changes = this._diff.diff(this.widgets);
    if (changes) {
      if(this.widgets.length > this.form.length)
        this.form.push(this.formBuilder.group({
          channel:['',Validators.required]
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
  sendmysubRE(index:number) {
    this.i = index;
    this.RedditmysubService
    .getMysubRe()
    .subscribe(res => {this.search[index] = JSON.parse(JSON.stringify(res))});
  }
}
