import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http: HttpClient) { }

  searchJobForOfficer(text: string) {
    return this.http.get<any[]>(`${base_url}/jobs/search/job/officer/${text}`).pipe(
      map(resp => resp)
    )
  }

 
  get() {
    return this.http.get<{ levels: any[], length: number }>(`${base_url}/level`).pipe(
      map(resp => {
        return { levels: resp.levels, length: resp.length }
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
    return this.http.get<any[]>(`${base_url}/jobs/organization/data`).pipe(
      map(resp => {
        return resp.map(el => {
          el.data.forEach((item: any, index: number) => {
            if (item.name === 'Sin funcionario') {
              el.data[index].tags = ["no-user"];
            }
          })
          return el
        })
      })
    )
  }
}
