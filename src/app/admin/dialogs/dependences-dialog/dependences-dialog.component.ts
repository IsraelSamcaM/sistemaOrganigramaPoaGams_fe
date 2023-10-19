import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DependenceServiceService } from '../../services/dependence.service.service';
import { Component , Inject} from '@angular/core';

@Component({
  selector: 'app-dependences-dialog',
  templateUrl: './dependences-dialog.component.html',
  styleUrls: ['./dependences-dialog.component.css']
})
export class DependencesDialogComponent {
  dependences: any[] = []
  FormDependence: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    depende_de: ['', Validators.required],
    sigla: ['', Validators.required],
    encargado: ['', Validators.required],
    estado: ['', Validators.required],
    tipo: ['', Validators.required],
  }); 

  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DependencesDialogComponent>,
    private usuariosService: DependenceServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.FormDependence.patchValue(this.data)
      console.log(this.data)
    }
  }

  guardar() {
    if (this.data) {  
      this.usuariosService.edit(this.data._id, this.FormDependence.value).subscribe(dependences=> {
        this.dialogRef.close(dependences);
      })
    }
    else {
      this.usuariosService.add(this.FormDependence.value).subscribe(dependences => {
        this.dialogRef.close(dependences)
      })
    }
  }
}
