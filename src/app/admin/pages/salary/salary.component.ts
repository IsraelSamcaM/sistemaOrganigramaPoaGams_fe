
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { JobService } from '../../services/job.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';

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
  displayedColumns5 = ['DatosGenerales','TotalItems','TotalSueldoMensual','TotalSueldoAnual','TotalAguinaldo','TotalCNS','TotalAFP','TotalProVivienda','TotalAporteSolidario','TotalAportes','TotalTotal' ]
  displayedColumns6 = ['_id','cantidadCargos','cantidadItem','cantidadContrato','totalSueldos','totalSueldoAnual','aportes','aguinaldos','total']
  displayedColumns7 = ['nombre','tipoContrato','nivel','sueldoMensual','sueldoAnual','Aguinaldo','CNS','AFP','proVivienda','AporteSolidario','TotalAportes','Total']
  displayedColumns8 = ['nombre','tipoContrato','estado','nivel','sueldoMensual','sueldoAnual','Aguinaldo','CNS','AFP','proVivienda','AporteSolidario','TotalAportes','Total']
  displayedColumns9 = ['partidaPresupuestaria', 'estado','objetivoPuesto','secretaria','nivel','denominacionPuesto','nombre','tipoContrato','sueldoMensual','tipoGasto'
                        ,'fuenteFinanciamiento','organismoFinanciador','duracionContrato','casos','sueldoMensual','sueldoAnual','Aguinaldo','CNS','AFP','proVivienda','AporteSolidario','TotalAportes','Total']

  dataSource = new MatTableDataSource<any>([]);
  dataSource2 = new MatTableDataSource<any>([]);
  dataSource3 = new MatTableDataSource<any>([]);
  dataSource4 = new MatTableDataSource<any>([]);
  dataSource5 = new MatTableDataSource<any>([]);
  dataSource6 = new MatTableDataSource<any>([]);  
  dataSource7 = new MatTableDataSource<any>([]);
  dataSource8 = new MatTableDataSource<any>([]);
  dataSource9 = new MatTableDataSource<any>([]);
  dataSource10 = new MatTableDataSource<any>([]);

  @ViewChild('paginatorParPre') paginatorParPre: MatPaginator;
  @ViewChild('paginatorEscSal') paginatorEscSal: MatPaginator;
  @ViewChild('paginatorItems') paginatorItems: MatPaginator;
  @ViewChild('paginatorEventuales') paginatorEventuales: MatPaginator;
  @ViewChild('paginatorPorSec') paginatorPorSec: MatPaginator;

  constructor(  
    private cargoService: JobService,
    public dialog: MatDialog,
  ) {
    this.Get()
    this.GetTotal() 
    this.GetTotalPartidaPresupestaria() 
    this.GetTotalPartidaPresupestariaGlobal()
    this.GetTotalItemsSalariosGlobal()
    this.GetTotalEvetualesSalariosGlobal()
    this.GetSecretariasGlobal()
    this.GetFullItems()
    this.GetFullEventuales()
  }
  ngAfterViewInit() {
    
  }

  Get() {
      this.cargoService.getEscalaSalarial().subscribe(data => {
        this.dataSource = new MatTableDataSource(data.salarys)
        this.dataSource.paginator = this.paginatorEscSal;
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
      this.dataSource3.paginator = this.paginatorParPre;
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

  GetTotalEvetualesSalariosGlobal() {
    this.cargoService.getGlobalEventualSalariosTotal().subscribe(data => {
      this.dataSource10 = new MatTableDataSource(data.globalSalarysEventualesTotal)
    })
  }
  

  GetSecretariasGlobal() {
    this.cargoService.getTotalSecretariaSalario().subscribe(data => {
      this.dataSource6 = new MatTableDataSource(data.secretariasTotalSalarys)
      this.dataSource6.paginator = this.paginatorPorSec;
    })
  }
  /**/ 
  GetFullItems() {
    this.cargoService.getFullItems().subscribe(data => {
      this.dataSource7 = new MatTableDataSource(data.fullItems)
      this.dataSource7.paginator = this.paginatorItems;
    })
  }

  /**/ 
  GetFullEventuales() {
      this.cargoService.getFullEventuales().subscribe(data => {
        this.dataSource8 = new MatTableDataSource(data.fullEventuales)
        this.dataSource8.paginator = this.paginatorEventuales;
    })
  }   

  
  exportToExcel(dataSources: MatTableDataSource<any>[], displayedColumnsArray: string[][], fileNames: string[]): void {
    const book: XLSX.WorkBook = XLSX.utils.book_new();

    dataSources.forEach((dataSource, index) => {
        const data = dataSource.data;
        const displayedColumns = displayedColumnsArray[index];
        const table = document.createElement('table');
        const tableHeaderRow = document.createElement('tr');
        
        displayedColumns.forEach(column => {
            const headerCell = document.createElement('th');
            headerCell.textContent = column;
            tableHeaderRow.appendChild(headerCell);
        });
        table.appendChild(tableHeaderRow);
        
        data.forEach(item => {
            const dataRow = document.createElement('tr');
            displayedColumns.forEach(column => {
                const cell = document.createElement('td');
                cell.textContent = item[column] || '';
                dataRow.appendChild(cell);
            });
            table.appendChild(dataRow);
        });
        
        const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
        XLSX.utils.book_append_sheet(book, worksheet, `Sheet${index + 1}`);
    });

    XLSX.writeFile(book, 'EscalaSalarial.xlsx');
  }
  
  
}
