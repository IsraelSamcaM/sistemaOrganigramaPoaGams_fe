
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
  displayedColumns3 = ['partidaPresupuestaria','cantidadCargos','totalSueldos','totalSueldoAnual','aportes','aguinaldo','total']
  displayedColumns4 = ['partidaPresupuestaria','cantidadCargos','totalSueldos','totalCostoAnual','totalAportes','totalAguinaldos','total']
  displayedColumns5 = ['nombre','cantidadCargos','totalSueldos','totalCostoAnual','totalAportes','totalAguinaldos','total']
  displayedColumns6 = ['_id','cantidadCargos','cantidadItem','cantidadContrato','totalSueldos','totalSueldoAnual','aportes','aguinaldos','total']

  dataSource = new MatTableDataSource<any>([]);
  dataSource2 = new MatTableDataSource<any>([]);
  dataSource3 = new MatTableDataSource<any>([]);
  dataSource4 = new MatTableDataSource<any>([]);
  dataSource5 = new MatTableDataSource<any>([]);
  dataSource6 = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private cargoService: JobService,
    public dialog: MatDialog,
  ) {
    this.Get()
    this.GetTotal()
    this.GetTotalPartidaPresupestaria() 
    this.GetTotalPartidaPresupestariaGlobal()
    this.GetTotalItemsSalariosGlobal()
    this.GetSecretariasGlobal()
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

  GetTotalPartidaPresupestaria() {
    this.cargoService.getEscalaSalarialPartidaPresupuestaria().subscribe(data => {
      this.dataSource3 = new MatTableDataSource(data.totalSalarysPartida)
      this.dataSource3.paginator = this.paginator;
    })
  }

  GetTotalPartidaPresupestariaGlobal() {
    this.cargoService.getTotalEscalaSalarialTotal().subscribe(data => {
      this.dataSource4 = new MatTableDataSource(data.totalSalarysEventualGlobal)
    })
  }

  GetTotalItemsSalariosGlobal() {
    this.cargoService.getGlobalItemSalariosTotal().subscribe(data => {
      this.dataSource5 = new MatTableDataSource(data.globalSalarysItemTotal)
    })
  }

  GetSecretariasGlobal() {
    this.cargoService.getTotalSecretariaSalario().subscribe(data => {
      this.dataSource6 = new MatTableDataSource(data.secretariasTotalSalarys)
    })
  }
}
