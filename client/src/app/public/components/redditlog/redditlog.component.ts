import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const url ='https://www.reddit.com/api/v1/authorize.compact?client_id=YnnZabHUzWnE4elhWCAgMg&response_type=code&state=test&redirect_uri=http://localhost:4200/public/redditlog&duration=permanent&scope=*';


@Component({
  selector: 'app-redditlog',
  templateUrl: './redditlog.component.html',
  styleUrls: ['./redditlog.component.css']
})
export class RedditlogComponent implements OnInit {

  public href: string = "";
  url: string = "asdf";

  constructor(private router : Router) {}
  
  ngOnInit(): void {
    this.href = this.router.url;
    this.href = this.href.split('=')[2]
    this.href = this.href.split('#')[0]
  }

}
