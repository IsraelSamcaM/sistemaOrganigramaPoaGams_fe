import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficersComponent } from './pages/officers/officers.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { JobDialogComponent } from './dialogs/job-dialog/job-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrgchartComponent } from './pages/orgchart/orgchart.component';
import { OfficerDialogComponent } from './dialogs/officer-dialog/officer-dialog.component';
import { LevelsComponent } from './pages/levels/levels.component';
import { LevelDialogComponent } from './dialogs/level-dialog/level-dialog.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { BudgetaryComponent } from './pages/budgetary/budgetary.component';



@NgModule({
  declarations: [
    OfficersComponent,
    JobsComponent,
    JobDialogComponent,
    OrgchartComponent,
    OfficerDialogComponent,
    LevelsComponent,
    LevelDialogComponent,
    SalaryComponent,
    BudgetaryComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
