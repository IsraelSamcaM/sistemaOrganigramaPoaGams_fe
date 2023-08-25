import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficersComponent } from './pages/officers/officers.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { OrgchartComponent } from './pages/orgchart/orgchart.component';
import { LevelsComponent } from './pages/levels/levels.component';
import { SalaryComponent } from './pages/salary/salary.component';
import { BudgetaryComponent } from './pages/budgetary/budgetary.component';


const routes: Routes = [
  { path: 'officers', component: OfficersComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'orgchart', component: OrgchartComponent },
  { path: 'levels', component: LevelsComponent },
  { path: 'salary', component: SalaryComponent },
  { path: 'budgetary', component: BudgetaryComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

