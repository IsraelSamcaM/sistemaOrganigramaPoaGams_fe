
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LevelService} from '../../services/level.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDialogComponent } from '../../dialogs/job-dialog/job-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements AfterViewInit {
  text: string = ''
  displayedColumns = ['nivel','sueldo','options']
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private LevelService: LevelService,
    public dialog: MatDialog,
  ) {
    this.Get()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Get() {
   
 
      this.LevelService.get().subscribe(data => {
        this.dataSource = new MatTableDataSource(data.levels)
        this.dataSource.paginator = this.paginator;
      })
    
  }
  applyFilter(event: Event) {
    this.text = (event.target as HTMLInputElement).value;
    this.Get()
  }
  cancelSearch() {
    this.text = ''
    this.Get()
  }
}