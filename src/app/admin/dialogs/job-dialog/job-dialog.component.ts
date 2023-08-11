import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobService } from '../../services/job.service';
import { LevelService } from '../../services/level.service';

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css']

})

export class JobDialogComponent {
  jobs: any[] = []
  dependentJobs: any[] = []
  tipoContrato: string
  niveles: any[] = []
  
  FormJob: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    secretaria: ['', Validators.required],
    nivel_id: ['', Validators.required],
    isRoot: [false, Validators.required],
    estado: [false, Validators.required],
    tipoContrato: ['', Validators.required]   
  }); 
  FormJobDetail: FormGroup = this.fb.group({
    partidaPresupuestaria: ['', Validators.required],
    objetivoPuesto: ['', Validators.required],
    denominacionPuesto: ['', Validators.required],  
    tipoGasto: [false, Validators.required],
    casos: ['', Validators.required] ,
    fuenteFinanciamiento: ['', Validators.required],
    organismoFinanciador: ['', Validators.required],
    duracionContrato: ['', Validators.required]
  });

  constructor(
    private cargoService: JobService,
    private levelService: LevelService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {


  }
  ngOnInit(): void {
    console.log(this.data)
    this.levelService.get().subscribe(data=>{
      this.niveles=data.levels          
    })
    
    if (this.data) {
      const { nivel_id, ...values } = this.data
       ///this.FormJob.patchValue(this.data)
       this.cargoService.getDependentsOfSuperior(this.data._id).subscribe(jobs => this.dependentJobs = jobs)
       this.FormJob.patchValue({ ...values, nivel_id: nivel_id._id })
       this.FormJobDetail.patchValue({ ... this.data.detalle_id})
       console.log(this.data)
     }


  }

  

  searchDependents(text: string) {
    this.cargoService.searchSuperior(text).subscribe(jobs => {
      this.jobs = jobs
    })
  }

  save() {
    const newJob = {
      ...this.FormJob.value,
      dependents: this.dependentJobs.map(element => element._id)
    }

    if (this.data) {
      this.cargoService.edit(this.data._id, newJob, this.FormJobDetail.value).subscribe(job => this.dialogRef.close(job))
    }
    else {
      this.cargoService.add(newJob, this.FormJobDetail.value).subscribe(job => this.dialogRef.close(job))
    }
  }

  selectDependents(value: any) {
    const job = value
    if (this.dependentJobs.some(element => element._id === job._id)) return
    this.dependentJobs.unshift(job)
    this.jobs = []
  }

  removeDependentJob(position: number) {
    if (this.data) {
      const dependent = this.dependentJobs[position]
      this.cargoService.removeDependent(dependent._id).subscribe(_ => this.dependentJobs.splice(position, 1))
    }
    else {
      this.dependentJobs.splice(position, 1)
    }

  }
  
  nivelSeleccionado(event: any) {
    const selectedValue = event.value;
    console.log('Nivel seleccionado:', selectedValue);
  }

}
