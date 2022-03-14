import { Component, OnInit, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';
import {YoutubeSearchService} from '../../services/youtube-search.service' 
import { FormBuilder, Validators } from '@angular/forms';
import { Widget } from '../../services/widget-factory.service';

export class SearchData {
  constructor(
    public kind?: string,
    public publishedAt?:  string,
    public title?: string,
    public description?: string,
    public channelTitle?: string,
    public thumbnails?:string
  )  {}
}

@Component({
  selector: 'app-youtube-search-widget',
  templateUrl: './youtube-search-widget.component.html',
  styleUrls: ['./youtube-search-widget.component.css']
})
export class YoutubeSearchWidgetComponent implements OnInit {

  search: SearchData[]=[];
  i =0;

  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>

  form: any[] =[]
  constructor(
    private YoutubeSearchService: YoutubeSearchService, 
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
      this.widgets.splice(index, 1);
  }
  sendSearchYT(index:number) {
    this.i = index;
    this.YoutubeSearchService
    .getSearchYT(this.form[index].value.channel)
    .subscribe(res => {this.search[index] = JSON.parse(JSON.stringify(res))});
  }
}
