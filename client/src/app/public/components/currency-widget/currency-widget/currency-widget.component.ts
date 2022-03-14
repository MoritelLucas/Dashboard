import { Component, OnInit, Input, IterableDiffer, IterableDiffers, DoCheck } from '@angular/core';
import {CurrencyService} from '../../services/currency.service' 
import { FormBuilder,FormGroup,FormControl, Validators,  } from '@angular/forms';
import { Widget } from '../../services/widget-factory.service';

export class currencyData {
  constructor(
    public value?: string,
    public id?:  string,
  )  {}
}

export class Code {
  constructor(
    public code?: string,
    public viewValue?:  string,
  )  {}
}

@Component({
  selector: 'app-currency-widget',
  templateUrl: './currency-widget.component.html',
  styleUrls: ['./currency-widget.component.css']
})
export class CurrencyWidgetComponent implements OnInit {

  currency:currencyData[]=[];
  @Input() widgets: Widget[]=[];
  private _diff!: IterableDiffer<Widget>
  i =0;
  y = setInterval(() =>this.sendCurrency(this.i), 300000);

  form: any[] =[]
  constructor(
    private CurrencyService: CurrencyService, 
    private formBuilder: FormBuilder,
    private _iterateDiff: IterableDiffers) {}

  ngDoCheck() {
    const changes = this._diff.diff(this.widgets);
    if (changes) {
      if(this.widgets.length > this.form.length)
        this.form.push(this.formBuilder.group({
          value:['',Validators.required],
          sym1:['',Validators.required],
          sym2:['',Validators.required],
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

  sendCurrency = (index:number) => {
    this.i = index;
    this.CurrencyService
      .getCurrency(this.form[index].value.value, this.form[index].value.sym1, this.form[index].value.sym2)
      .subscribe(res => { this.currency[index] = JSON.parse(JSON.stringify(res))});
  }

}
