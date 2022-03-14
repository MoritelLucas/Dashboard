import { Component, OnInit, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';
import {RiotmatchserviceService} from '../services/riotmatchservice.service' 
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { Widget } from '../services/widget-factory.service';

export class MatchData {
  constructor(
    public name?: string,
    public gameMode?:  string,
    public championName?: string,
    public kills ?: boolean,
    public deaths?: string,
    public assists?: string,
    public champLevel ?: boolean,
    public role?: string,
    public win?: string,
  )  {}
}

@Component({
  selector: 'app-riotmatch-widget',
  templateUrl: './riotmatch-widget.component.html',
  styleUrls: ['./riotmatch-widget.component.css']
})
export class RiotmatchWidgetComponent implements OnInit {
  match:MatchData[]=[];
  array: any[]=[];
  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>
  i =0;
  y = setInterval(() =>this.sendMatch(this.i), 300000);

  form: any[] =[]
  constructor(
    private RiotsummonService: RiotmatchserviceService, 
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

  sendMatch(index:number) {
    this.i = index;
    this.RiotsummonService
        .getMatch(this.form[index].value.location)
        .subscribe(res => {this.match[index] = JSON.parse(JSON.stringify(res))});
  }
}

