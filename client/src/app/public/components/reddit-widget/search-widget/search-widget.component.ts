import { Component, OnInit, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';
import {RedditsearchService} from '../../services/redditsearch.service' 
import { FormBuilder, Validators } from '@angular/forms';
import { Widget } from '../../services/widget-factory.service';

export class SearchData {
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
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.css']
})
export class SearchWidgetComponent implements OnInit {

  search: SearchData[]=[];
  i =0;
  y = setInterval(() =>this.sendSearchRE(this.i), 30000);

  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>

  form: any[] =[]
  constructor(
    private RedditsearchService: RedditsearchService, 
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
  sendSearchRE(index:number) {
    this.i = index;
    this.RedditsearchService
    .getSearchYT(this.form[index].value.channel)
    .subscribe(res => {this.search[index] = JSON.parse(JSON.stringify(res))});
  }
}
