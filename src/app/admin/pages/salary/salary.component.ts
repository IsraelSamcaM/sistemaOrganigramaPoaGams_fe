
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { JobService } from '../../services/job.service';
import { MatDialog } from '@angular/material/dialog';
import { JobDialogComponent } from '../../dialogs/job-dialog/job-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent {
  text: string = ''
  displayedColumns = ['_id','cantidadCargos','sueldoBase','totalSueldoMensual','totalSueldoAnual']

  displayedColumns2 = ['total','totalCantidadCargos','totalSueldo','totalSueldoMensual','totalSueldoAnual']

  dataSource = new MatTableDataSource<any>([]);
  dataSource2 = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private cargoService: JobService,
    public dialog: MatDialog,
  ) {
    this.Get()
    this.GetTotal()
  }
  ngAfterViewInit() {
    
  }

  Get() {
      this.cargoService.getEscalaSalarial().subscribe(data => {
        this.dataSource = new MatTableDataSource(data.salarys)
       
      })  
  }

  GetTotal() {
    this.cargoService.getTotalEscalaSalarial().subscribe(data => {
      this.dataSource2 = new MatTableDataSource(data.totalSalarys)
    })

  }
}
