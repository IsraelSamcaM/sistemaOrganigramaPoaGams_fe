import { Component, Input, OnChanges } from '@angular/core';
import { Edge, Node, Layout, DagreNodesOnlyLayout } from '@swimlane/ngx-graph';
import * as shape from 'd3-shape';    


@Component({
  selector: 'app-orgchar',
  templateUrl: './orgchar.component.html',
  styleUrls: ['./orgchar.component.css']
})
export class OrgcharComponent implements OnChanges{
  @Input() data: any[] = []
  public nodes: Node[] = [];
  public links: Edge[] = [];
  public layoutSettings = {
  orientation: 'TB'
  };
  public curve: any = shape.curveLinear;
  public layout: Layout = new DagreNodesOnlyLayout();

  public getStyles(node: Node): any {
    return {
      'background-color': node.data.backgroundColor
    };
  }

  ngOnChanges(){
     
    for (const funcionario of this.data) {
      const node: Node = {
        id:  `${funcionario.id}`,
        label: funcionario.title, 
        data: {
          estado: funcionario.estado,
          nombre: funcionario.name,
          nivel: funcionario.nivel,
          backgroundColor: funcionario.backgroundColor
        }
      };

      this.nodes.push(node);
    }

    for (const employee of this.data) {
      if (!employee.pid) {
        continue;
      }

      const edge: Edge = {
        source: employee.pid,
        target: employee.id,
        label: '',
        data: {
        }
      };

      this.links.push(edge);
    }
  }

}
