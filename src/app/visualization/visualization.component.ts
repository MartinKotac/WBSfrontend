import {Component, OnInit} from '@angular/core';
import {PredictionService} from "../services/prediction.service";
import {Subject} from "rxjs";
import {Edge, Node} from "@swimlane/ngx-graph";

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  rdfGraph: Array<Triple> = [];
  center$: Subject<boolean> = new Subject();

  nodes: Node[] = [
    {
      id: 'first',
      label: 'Martin'
    }, {
      id: 'second',
      label: 'Nadica'
    }
  ];

  links: Edge[] = [
    {
      id: 'a',
      source: 'first',
      target: 'second',
      label: 'is parent of'
    },
  ];
  showTriples: boolean = false;

  constructor(private predictionService: PredictionService) {
  }

  ngOnInit(): void {
    this.predictionService.getPredictionData().subscribe(data => {
      this.rdfGraph = data['rdf_graph'];
      this.rdfGraph.forEach(triple => {
        let subjectCleaned = this.cleanUrl(triple.subjectRdf);
        let propertyCleaned = this.cleanUrl(triple.propertyRdf);
        let objectCleaned = this.cleanUrl(triple.objectRdf);
        console.log(subjectCleaned,"->",propertyCleaned,"->",objectCleaned);
        const nodeIdToCheck = this.cleanUrl(triple.subjectRdf)
        const foundNode = this.nodes.find(node => node.id === nodeIdToCheck);
        if(foundNode){

        }else {
          // let newNode = {
          //   id: ,
          //   label: 'Martin'
          // }
        }

      })
    })
  }


  centerGraph() {
    this.center$.next(true)
  }

  private cleanUrl(url: string): string {
    // @ts-ignore
    return url.split('/').pop().slice(0, -1);
  }
}

interface Triple {
  subjectRdf: string,
  propertyRdf: string,
  objectRdf: string
}
