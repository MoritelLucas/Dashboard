import { Injectable } from '@angular/core';

export interface Widget {
  name: string,
  infos?: any,
  options?: any,
}

@Injectable({
  providedIn: 'root'
})

export class WidgetFactoryService {

  private handler: Map<string, (wName: string, wOptions: any) => Promise<Widget>> = new Map([
    ['weather', this.createWidgetWeatherInfo.bind(this)],
    ['location', this.createWidgetLocationInfo.bind(this)],
    ['time', this.createWidgetTimeInfo.bind(this)],
    ['currency', this.createWidgetCurrency.bind(this)],
    ['channel Info', this.createWidgetYoutubeChannelInfo.bind(this)],
    ['search', this.createWidgetYoutubeSearch.bind(this)],
    ['search sub', this.createWidgetRedditSearch.bind(this)],
    ['Summoner', this.createWidgetRiotsummoner.bind(this)],
    ['Match', this.createWidgetRiotmatch.bind(this)],
    ['Curiosity', this.createWidgetNasa.bind(this)],
]);

async createWidget(wName: string, wOptions: any): Promise<Widget> {
    const funct = this.handler.get(wName);
    return (funct !== undefined) ? await funct(wName, wOptions) : { name: 'undefined' };
}

private async createWidgetWeatherInfo(wName: string, wOptions: any): Promise<Widget> {
    return { name: wName }
}

private async createWidgetLocationInfo(wName: string, wOptions: any): Promise<Widget> {
    return { name: wName }
}

private async createWidgetCurrency(wName: string, wOptions: any): Promise<Widget> {
    return { name: wName }
}

private async createWidgetYoutubeChannelInfo(wName: string, wOptions: any): Promise<Widget> {
  return { name: wName }
}

private async createWidgetYoutubeSearch(wName: string, wOptions: any): Promise<Widget> {
  return { name: wName }
}

private async createWidgetTimeInfo(wName: string, wOptions: any): Promise<Widget> {
  return { name: wName }
}

private async createWidgetRedditSearch(wName: string, wOptions: any): Promise<Widget> {
  return { name: wName }
}
private async createWidgetRedditPosts(wName: string, wOptions: any): Promise<Widget> {
  return { name: wName }
}
private async createWidgetRedditMysub(wName: string, wOptions: any): Promise<Widget> {
  return { name: wName }
}
private async createWidgetRiotsummoner(wName: string, wOptions: any): Promise<Widget> {
  return { name: wName }
}
private async createWidgetRiotmatch(wName: string, wOptions: any): Promise<Widget> {
  return { name: wName }
}
private async createWidgetNasa(wName: string, wOptions: any): Promise<Widget> {
  return { name: wName }
}
  constructor() { }
}
