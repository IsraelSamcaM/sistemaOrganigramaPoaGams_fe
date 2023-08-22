import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BudgetaryService} from '../../services/budgetary.service.service';
import { MatDialog } from '@angular/material/dialog';
import { LevelDialogComponent } from '../../dialogs/level-dialog/level-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-budgetary',
  templateUrl: './budgetary.component.html',
  styleUrls: ['./budgetary.component.css']
})
export class BudgetaryComponent {
  text: string = ''
  displayedColumns = ['codigo','nombrePartida','fuenteFinanciamiento','organismoFinanciador']
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private BudgetaryService: BudgetaryService,
    public dialog: MatDialog,
  ) {
    this.Get()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  Get() {
      this.BudgetaryService.get().subscribe(data => {
        this.dataSource = new MatTableDataSource(data.budgetarys)
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
  Edit(item: any) {
    const dialogRef = this.dialog.open(LevelDialogComponent, {
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
    const dialogRef = this.dialog.open(LevelDialogComponent, {
      width: '800px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.dataSource = new MatTableDataSource([result, ...this.dataSource.data])
        this.dataSource.paginator = this.paginator;
      }
    })
  }

 
  delete(budgetary: any) {
    this.BudgetaryService.delete(budgetary._id).subscribe(() => {
      const indexFound = this.dataSource.data.findIndex((element: any) => element._id === budgetary._id);
      if (indexFound !== -1) {
        this.dataSource.data.splice(indexFound, 1); // Eliminar el elemento del array de datos
        this.dataSource = new MatTableDataSource(this.dataSource.data); // Actualizar la fuente de datos
        this.dataSource.paginator = this.paginator; // Actualizar el paginador si es necesario
      }
    });
  }
  
}
