import { Component, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
//import OrgChart from "@balkangraph/orgchart.js";
import { Edge, Node, Layout, DagreNodesOnlyLayout } from '@swimlane/ngx-graph';
import { JobService } from '../../services/job.service';
import * as shape from 'd3-shape';    


@Component({  
  selector: 'app-orgchart',
  templateUrl: './orgchart.component.html',
  styleUrls: ['./orgchart.component.css']
})
export class OrgchartComponent {
  organizationData: any[] = []
  organizationDataOrg: any[] = []
  tags={}
  constructor(private readonly jobService: JobService) {
  }
  


  ngOnInit(): void {
    
    this.jobService.getOrganization().subscribe(data => {
    this.organizationData = data.organigrama
    })
  }

  tabChange(event: MatTabChangeEvent) {
   
  }

  public getStyles(node: Node): any {
    return {
      'background-color': node.data.backgroundColor
    };
  }
  

}
