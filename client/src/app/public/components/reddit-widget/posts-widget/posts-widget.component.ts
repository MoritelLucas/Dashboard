import { Component, OnInit, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';
import {RedditpostsService} from '../../services/redditposts.service' 
import { FormBuilder, Validators } from '@angular/forms';
import { Widget } from '../../services/widget-factory.service';

export class PostsData {
  constructor(
    public title?: string,
    public thumbnail?: string,
    public url?: string,
    public ups?: string,
  )  {}
}

@Component({
  selector: 'app-posts-widget',
  templateUrl: './posts-widget.component.html',
  styleUrls: ['./posts-widget.component.css']
})
export class PostsWidgetComponent implements OnInit {

  search: PostsData[]=[];
  i =0;
  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>

  form: any[] =[]
  constructor(
    private RedditspostsService: RedditpostsService, 
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
  sendPostsRE(index:number) {
    this.i = index;
    this.RedditspostsService
    .getPostsRe(this.form[index].value.channel)
    .subscribe(res => {this.search[index] = JSON.parse(JSON.stringify(res))});
  }
}
