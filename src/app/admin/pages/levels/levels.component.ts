
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { JobService } from '../../services/job.service';
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
    private cargoService: JobService,
    public dialog: MatDialog,
  ) {
    this.Get()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Get() {
    if (this.text !== '') {
      this.cargoService.search(this.text).subscribe(data => {
        this.dataSource = new MatTableDataSource(data.jobs)
        this.dataSource.paginator = this.paginator;
      })
    }
    else {
      this.cargoService.get().subscribe(data => {
        this.dataSource = new MatTableDataSource(data.jobs)
        this.dataSource.paginator = this.paginator;
      })
    }
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