import { Component, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OfficerService } from '../../services/officer.service';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-officer-dialog',
  templateUrl: './officer-dialog.component.html',
  styleUrls: ['./officer-dialog.component.css']
})
export class OfficerDialogComponent {
  availableJobs: any[] = []
  noJob: boolean = false
  Form_Funcionario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    paterno: ['', Validators.required],
    materno: [''],
    dni: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.maxLength(8)]],
    cargo: ['', Validators.required],
    direccion: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<OfficerDialogComponent>,
    private usuariosService: OfficerService,
    private cargoService: JobService
  ) { }


  ngOnInit(): void {
    if (this.data) {
      const { cargo, ...values } = this.data
      if (!cargo) {
        this.noJob = true
        this.Form_Funcionario.patchValue(values)
      }
      else {
        this.Form_Funcionario.patchValue({ ...values, cargo: cargo._id })
      }
    }
  }


  guardar() {
    if (this.data) {  
      this.usuariosService.edit(this.data._id, this.Form_Funcionario.value).subscribe(officer => {
        this.dialogRef.close(officer);
      })  
    }
    else {
      this.usuariosService.add(this.Form_Funcionario.value).subscribe(officer => {
        this.dialogRef.close(officer)
      })
    }   
  }


  searchJob(value: any) {
    this.cargoService.searchJobForOfficer(value).subscribe(data => {
      this.availableJobs = data
    })
  }
  
  selectJob(job: any) {
    this.Form_Funcionario.get('cargo')?.setValue(job._id)
  }
  
  removeJob() {
    if (this.noJob) {
      this.Form_Funcionario.removeControl('cargo')
      this.availableJobs = []
    }
    else {
      this.Form_Funcionario.addControl('cargo', new FormControl(this.data?.cargo ? this.data.cargo._id : '', Validators.required))
    }
  }

}
