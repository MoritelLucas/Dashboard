import { Component, OnInit, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';
import {YoutubeService} from '../../services/youtube.service' 
import { FormBuilder, Validators } from '@angular/forms';
import { Widget } from '../../services/widget-factory.service';

export class channelData {
  constructor(
    public channelname?: string,
    public viewCount?:  string,
    public subscriberCount?: string,
    public videoCount ?: String,
    public _id?: string,
  )  {}
}

@Component({
  selector: 'app-youtube-widget',
  templateUrl: './youtube-widget.component.html',
  styleUrls: ['./youtube-widget.component.css']
})
export class YoutubeWidgetComponent implements OnInit {

  channel:channelData[]=[];
  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>
  i =0;
 
  form: any[] =[]
  constructor(
    private YoutubeService: YoutubeService, 
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

  sendchannelYT(index:number) {
    this.i = index;
    this.YoutubeService
        .getChannelInfo(this.form[index].value.channel)
        .subscribe(res => {this.channel[index] = JSON.parse(JSON.stringify(res))});
  }
}
