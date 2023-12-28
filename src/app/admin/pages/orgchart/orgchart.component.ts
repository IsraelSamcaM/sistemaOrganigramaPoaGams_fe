import { Component, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Edge, Node, Layout, DagreNodesOnlyLayout } from '@swimlane/ngx-graph';
import { JobService } from '../../services/job.service';
import html2canvas from 'html2canvas'; // Cambio en la importación
import jsPDF from 'jspdf'; // Cambio en la importación

@Component({
  selector: 'app-orgchart',
  templateUrl: './orgchart.component.html',
  styleUrls: ['./orgchart.component.css']
})
export class OrgchartComponent {
  organizationData: any[] = [];
  organizationDataOrg: any[] = [];
  tags = {};
  layoutSettings: DagreNodesOnlyLayout = new DagreNodesOnlyLayout();

  constructor(private readonly jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getOrganization().subscribe(data => {
      this.organizationData = data.organigrama;
      console.log(data.organigrama)
    });
  }

  tabChange(event: MatTabChangeEvent) {
    // Implementa lógica según sea necesario
  }

  public getStyles(node: Node): any {
    return {
      'background-color': node.data.backgroundColor
    };
  }

}
