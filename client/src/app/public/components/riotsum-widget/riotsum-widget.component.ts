import { Component, OnInit, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';
import {RiotsummonService} from '../services/riotservice.service' 
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { Widget } from '../services/widget-factory.service';

export class summonerData {
  constructor(
    public name?: string,
    public summonerLevel?:  string,
    public rank?: string,
    public wins ?: boolean,
    public losses?: string,
    public leaguePoints?: string,
  )  {}
}
@Component({
  selector: 'app-riotsum-widget',
  templateUrl: './riotsum-widget.component.html',
  styleUrls: ['./riotsum-widget.component.css']
})
export class RiotsummonerComponent implements OnInit {

  summoner:summonerData[]=[];
  array: any[]=[];
  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>
  i =0;
  y = setInterval(() =>this.sendSummoner(this.i), 300000);

  form: any[] =[]
  constructor(
    private RiotsummonService: RiotsummonService, 
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

  sendSummoner(index:number) {
    this.i = index;
    this.RiotsummonService
        .getSummoner(this.form[index].value.location)
        .subscribe(res => {this.summoner[index] = JSON.parse(JSON.stringify(res))});
  }

}
