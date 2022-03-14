import { Injectable } from '@angular/core';
import { WidgetFactoryService, Widget } from './widget-factory.service';

@Injectable({
  providedIn: 'root'
})
export class DuplicateWidgetService {

  constructor(
      private factory: WidgetFactoryService,
  ) { }

  configureWidget(widgets: Widget[], wName: string): void {
    this.addWidget(widgets, wName, undefined);
  }

  private addWidget = async (widgets: Widget[], wName: string, options: any) => widgets.push(await this.factory.createWidget(wName, options));

}