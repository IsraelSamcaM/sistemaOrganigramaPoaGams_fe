import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { JobService } from '../../services/job.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDialogComponent } from '../../dialogs/job-dialog/job-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements AfterViewInit {
  text: string = ''
  displayedColumns = ['nombre','secretaria','options']
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

  Edit(item: any) {
    const dialogRef = this.dialog.open(JobDialogComponent, {
      width: '800px',
      data: item
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.dataSource.data.findIndex(element => element._id === result._id);
        this.dataSource.data[index] = result
        this.dataSource = new MatTableDataSource(this.dataSource.data)
        this.dataSource.paginator = this.paginator;
      }
    });
  }
  add() {
    const dialogRef = this.dialog.open(JobDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource([result, ...this.dataSource.data])
        this.dataSource.paginator = this.paginator;
      }
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
