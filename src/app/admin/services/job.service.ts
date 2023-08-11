import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  searchJobForOfficer(text: string) {
    return this.http.get<any[]>(`${base_url}/jobs/search/job/officer/${text}`).pipe(
      map(resp => resp)
    )
  }

  searchSuperior(text: string) {
    return this.http.get<any[]>(`${base_url}/jobs/search/dependents/${text}`).pipe(
      map(resp => resp)
    )
  }
  getDependentsOfSuperior(id_superior: string) {
    return this.http.get<any[]>(`${base_url}/jobs/dependents/${id_superior}`).pipe(
      map(resp => resp)
    )
  }
  removeDependent(id_dependent: string) {
    return this.http.delete<any>(`${base_url}/jobs/dependent/${id_dependent}`).pipe(
      map(resp => resp)
    )
  }

  get() {
    return this.http.get<{ jobs: any[], length: number }>(`${base_url}/jobs`).pipe(
      map(resp => {
        return { jobs: resp.jobs, length: resp.length }
      })
    )
  }
//metodo de escala salarial 
  getEscalaSalarial() {
    return this.http.get<{ salarios: any[], length: number }>(`${base_url}/jobs/escala`).pipe(
      map(resp => {
        return { salarys: resp.salarios, length: resp.length }
      })
    )
  }

  //metodo de total escala salarial 
  getTotalEscalaSalarial() {
    return this.http.get<{ totalSalarios: any[], length: number }>(`${base_url}/jobs/totalEscala`).pipe(
      map(resp => {
        return { totalSalarys: resp.totalSalarios, length: resp.length }
      })
    )
  }
  
  //metodo de global de eventuales 
  getTotalEscalaSalarialTotal() {
    return this.http.get<{ totalSalariosPartidaTotal: any[], length: number }>(`${base_url}/jobs/escalaPartidaPresupuestariaTotal`).pipe(
      map(resp => {
        return { totalSalarysEventualGlobal: resp.totalSalariosPartidaTotal, length: resp.length }
      })
    )
  }

  //metodo de global de items 
  getGlobalItemSalariosTotal() {
    return this.http.get<{ globalSalariosItemTotal: any[], length: number }>(`${base_url}/jobs/totalGlobalItems`).pipe(
      map(resp => {
        return { globalSalarysItemTotal: resp.globalSalariosItemTotal, length: resp.length }
      })
    )
  }

  //metodo de total escala salarial por partida presupuestaria
  getEscalaSalarialPartidaPresupuestaria() {
    return this.http.get<{ totalSalariosPartida: any[], length: number }>(`${base_url}/jobs/escalaPartidaPresupuestaria`).pipe(
      map(resp => {
        return { totalSalarysPartida: resp.totalSalariosPartida, length: resp.length }
      })
    )
  }

  //metodo que saca todo por secretaria 
  getTotalSecretariaSalario() {
    return this.http.get<{ globalSecretarias: any[], length: number }>(`${base_url}/jobs/totalGlobalSecretarias`).pipe(
      map(resp => {
        return { secretariasTotalSalarys: resp.globalSecretarias, length: resp.length }
      })
    )
  }
 
  search(text: string) {
    return this.http.get<{ jobs: any[], length: number }>(`${base_url}/jobs/${text}`).pipe(
      map(resp => {
        return { jobs: resp.jobs, length: resp.length }
      })
    )
  }
  add(job: any, jobDetail:any) {
    return this.http.post<any>(`${base_url}/jobs`, { job, jobDetail}).pipe(
      map(resp => resp)
    )
  }
  edit(id: string, job: any, jobDetail:any) {
    return this.http.put<any>(`${base_url}/jobs/${id}`,  { job, jobDetail}).pipe(
      map(resp =>resp)
    )
  }

  getOrganization() {
    return this.http.get<{organigrama:any[],tags:any}>(`${base_url}/jobs/organization/data`).pipe(
      map(resp => {
        // const newOrg=resp.organigrama.map(el => {         
        //   el.data.forEach((item: any, index: number) => {
        //     // if (item.name === 'Sin funcionario') {
        //     //   el.data[index].tags = ["no-user"];
        //     // }
        //     // if(item.estado =="ITEM"){
        //     //   el.data[index].tags=el.data[index].tags[0]+' '+'item'

        //     // }
        //     // else if(item.estado =="EVENTUAL"){
        //     //   el.data[index].tags=el.data[index].tags[0]+' '+'eventual'

        //     // }
        //   })
        //   return el
        // })

        console.log(resp.organigrama)
        return {organigrama:resp.organigrama,tags:resp.tags}
      })
    )
  }
}

