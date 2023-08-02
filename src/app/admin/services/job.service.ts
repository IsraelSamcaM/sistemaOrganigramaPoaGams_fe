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
  search(text: string) {
    return this.http.get<{ jobs: any[], length: number }>(`${base_url}/jobs/${text}`).pipe(
      map(resp => {
        return { jobs: resp.jobs, length: resp.length }
      })
    )
  }
  add(job: any) {
    return this.http.post<any>(`${base_url}/jobs`, job).pipe(
      map(resp => resp)
    )
  }
  edit(id: string, job: any) {
    return this.http.put<any>(`${base_url}/jobs/${id}`, job).pipe(
      map(resp => resp)
    )
  }

  getOrganization() {
    return this.http.get<{organigrama:any[],tags:any}>(`${base_url}/jobs/organization/data`).pipe(
      map(resp => {
        const newOrg=resp.organigrama.map(el => {         
          el.data.forEach((item: any, index: number) => {
            // if (item.name === 'Sin funcionario') {
            //   el.data[index].tags = ["no-user"];
            // }
            if(item.estado =="ITEM"){
              el.data[index].tags=el.data[index].tags[0]+' '+'item'

            }
            else if(item.estado =="EVENTUAL"){
              el.data[index].tags=el.data[index].tags[0]+' '+'eventual'

            }
          })
          return el
        })

        console.log(resp.organigrama)
        return {organigrama:newOrg,tags:resp.tags}
      })
    )
  }
}

