import { Component, OnInit, Injectable, ViewEncapsulation, Inject } from '@angular/core';
import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FlatTreeControl} from '@angular/cdk/tree';
import { HttpClient } from '@angular/common/http';
import{ GlobalConstants } from '../global/key';
import { Widget } from '../services/widget-factory.service';
import {DuplicateWidgetService} from '../services/duplicate-widget.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';


export class DynamicFlatNode {
  constructor(
    public item: string,
    public level:number,
    public expandable = false,
    public isLoading = false,
  ) {}
}

export class userData {
  constructor(
    public id:  string,
    public email: string,
    public verified_email : boolean,
    public name: string,
    public given_name: string,
    public family_name: string,
    public picture: string,
    public locale: string,
    public tokenId: string,
    )  {}
}

@Injectable({providedIn: 'root'})
export class DynamicDatabase {
  dataMap = new Map<string, string[]>([
    ['City', ['weather', 'location', 'time']],
    ['Youtube', ['search', 'channel Info']],
    ['Currecy', ['currency']],
    ['Reddit', ['search sub']],
    ['Riot', ['Summoner', 'Match']],
    ['Nasa', ['Curiosity']],
  ]);

  rootLevelNodes: string[] = ['City', 'Youtube', 'Currecy', 'Reddit', 'Riot', 'Nasa'];

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}

export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _database: DynamicDatabase,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }


  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this._database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) {
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(
          name => new DynamicFlatNode(name, node.level + 1, this._database.isExpandable(name)),
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 1000);
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class DashboardComponent implements OnInit{

  user!: userData;
  widgets: Widget[] = [];
  logreddit?:boolean;

  constructor(database: DynamicDatabase, private httpClient: HttpClient, private add: DuplicateWidgetService,public dialog: MatDialog) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    this.dataSource.data = database.initialData();
  }
  treeControl: FlatTreeControl<DynamicFlatNode>;
  dataSource: DynamicDataSource;
  getLevel = (node: DynamicFlatNode) => node.level;
  isExpandable = (node: DynamicFlatNode) => node.expandable;
  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
  
  ngOnInit() {
    this.sendUserData();
  }
  getUserData(): Observable<any> {
    return this.httpClient.get<any>("http://localhost:8080/oauth2")
  }
  openDialog(): void {
   this.logreddit = true
    const dialogRef = this.dialog.open(PopupDialog, {
      width: '250px',
  });
  }
  sendUserData() {
  this.getUserData().subscribe(res=> {this.user=res, GlobalConstants.jwtToken = res.tokenId});
  }
  newWidget = (wName: string): void => this.add.configureWidget(this.widgets, wName);

}

@Component({
  selector: 'popup',
  templateUrl: 'popup.html',
})
export class PopupDialog {
  yourURL?: string;
  constructor(
    public dialogRef: MatDialogRef<PopupDialog>,
    private router: Router,
  ) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}