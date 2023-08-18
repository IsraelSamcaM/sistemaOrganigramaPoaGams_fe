import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import OrgChart from "@balkangraph/orgchart.js";
import { JobService } from '../../services/job.service';

OrgChart.templates['ula'].size = [500, 150];

OrgChart.templates['ula']['field_0'] = '<text style="font-size: 19px;" x="250" y="50" class="field_0">{val}</text>';
OrgChart.templates['ula']['field_1'] = '<text style="font-size: 16px;" class="field_1" x="245" y="90">{val}</text>';
OrgChart.templates['ula']['field_2'] = '<text style="font-size: 16px;" class="field_1" x="245" y="120">{val}</text>';
OrgChart.templates['ula'].node = '<rect filter="url(#cool-shadow)"  x="0" y="0" height="140" width="500" fill="#ffffff" stroke-width="1" stroke="#eeeeee" rx="10" ry="10"></rect>';
OrgChart.SEARCH_PLACEHOLDER= "Buscar cargo";

OrgChart.templates['ula'].editFormHeaderColor = '#023E8A';

@Component({
  selector: 'app-orgchart',
  templateUrl: './orgchart.component.html',
  styleUrls: ['./orgchart.component.css']
})
export class OrgchartComponent {
  organizationData: any[] = []
  tags={}
  constructor(private readonly jobService: JobService) {
  }

  ngOnInit(): void {
    this.jobService.getOrganization().subscribe(data => {
      this.organizationData = data.organigrama
      this.tags = data.tags
      console.log(data.tags)
    })
  }
  
  tabChange(event: MatTabChangeEvent) {

    const tree = document.getElementById(`s${event.index}`);
    if (tree) {
      const chart = new OrgChart(tree, {
        
        levelSeparation: 150,
        siblingSeparation:80,
        subtreeSeparation: 150,
        
        menu: {
          pdf: { text: "Export PDF" },
          png: { text: "Export PNG" },
          svg: { text: "Export SVG" },
          csv: { text: "Export CSV" }
        },
        template: "ula",
        tags: this.tags,
        
        
        editForm: {
          readOnly: true,
          generateElementsFromFields: false,

          titleBinding: undefined,
          elements: [
            { type: 'textbox', label: 'Funcionario', binding: 'name' },
            { type: 'textbox', label: 'Cargo', binding: 'title', btn: 'Upload' },
            { type: 'textbox', label: 'Nivel', binding: 'nivel', btn: 'Upload' }
          ],
          buttons: {  
            edit: null,
            share: null,
            pdf: null
          },
        },
        miniMap: false,
        toolbar: {
          layout: true,
          zoom: true,
          fit: true,
          expandAll: true
        },
      
        
        nodeBinding: {
          field_0: "title",
          field_1: "name",
          field_2: "nivel",
          img_0: "img",
          size: 'small'
        },
      });
      chart.on('exportstart', function(sender, args){
        args.styles += '<link href= "../../../../styles.css" rel="stylesheet">';
        args.styles += document.getElementById(`s${event.index}`);
      });

      chart.on('init', function (sender) {
        sender.toolbarUI.showLayout();
      });

      
      chart.load(this.organizationData[event.index].data)
    }
  }

}
