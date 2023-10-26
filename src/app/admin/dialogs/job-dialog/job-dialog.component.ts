import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobService } from '../../services/job.service';
import { LevelService } from '../../services/level.service';
import { BudgetaryService} from '../../services/budgetary.service.service'

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css']

})

export class JobDialogComponent {
  availablePartidas: any[] = []
  availableJobs: any[] = []
  noJob: boolean = false
  noPartida: boolean = false
  jobs: any[] = []
  dependentJobs: any[] = []
  tipoContrato: string
  niveles: any[] = []
  partidas: any[] = []
  
  FormJob: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    secretaria: ['', Validators.required],
    nivel_id: ['', Validators.required],
    isRoot: [false, Validators.required],
    estado: ['ELIMINACION', Validators.required],
    tipoContrato: ['', Validators.required],
    superior: ['', Validators.required],
    //dependencia_id:[''],
    partida_id:['',Validators.required],
    denominacion:['',Validators.required],
    duracion_contrato:['',Validators.required],
  }); 

  constructor(
    private cargoService: JobService,
    private levelService: LevelService,
    private BudgetaryService: BudgetaryService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {


  }
  ngOnInit(): void {

    console.log(this.data)
    
    this.levelService.get().subscribe(data=>{
      this.niveles=data.levels          
    })
    
    this.BudgetaryService.get().subscribe(data=>{
      this.partidas=data.budgetary          
    })

    if (this.data) {
      const { nivel_id,superior, ...values } = this.data
       this.cargoService.getDependentsOfSuperior(this.data._id).subscribe(jobs => this.dependentJobs = jobs)
       this.FormJob.patchValue({ ...values, nivel_id: nivel_id._id })
       console.log(this.data)
      if (!superior) {
        this.noJob = true
        this.FormJob.patchValue(values)
      }
      else {
        this.FormJob.patchValue({ ...values, superior: superior._id })
      }
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
    console.log(newJob)

    if (this.data) {
      this.cargoService.edit(this.data._id, newJob).subscribe(job => this.dialogRef.close(job))
    }
    else {
      this.cargoService.add(newJob).subscribe(job => this.dialogRef.close(job))
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

  get isFormValid() {
    if (this.FormJob.get('tipoContrato')?.value === 'ITEM') {
      if (this.FormJob.valid) return true
    }
    return false
  }

  searchJob(value: any) {
    this.cargoService.searchJobForOfficer(value).subscribe(data => {
      this.availableJobs = data
    })
  }

  selectJob(job: any) {
    this.FormJob.get('superior')?.setValue(job._id)
  }

  removeJob() {
    if (this.noJob) {
      this.FormJob.removeControl('superior')
    }
    else {
      this.FormJob.addControl('superior', new FormControl(this.data?.superior ? this.data.superior._id : '', Validators.required))
    }
  }



  searchPartida(value: any) {
    this.BudgetaryService.searchPartidaForJob(value).subscribe(data => {
      this.availablePartidas = data
    })
  }

  selectPartida(bulgetary: any) {
    this.FormJob.get('partida_id')?.setValue(bulgetary._id)
  }

  removePartida() {
    if (this.noPartida) {
      this.FormJob.removeControl('partida_id')
    }
    else {
      this.FormJob.addControl('partida_id', new FormControl(this.data?.partida_id ? this.data.partida_id._id : '', Validators.required))
    }
  } 
}
