import {Component, OnInit} from '@angular/core';
import {PredictionService} from "../services/prediction.service";

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  rdfGraph: Array<Triple> = [];

  constructor(private predictionService: PredictionService) {
  }

  ngOnInit(): void {
    this.predictionService.getPredictionData().subscribe(data => {
      this.rdfGraph = data['rdf_graph'];
      console.log("Visualization Component", this.rdfGraph)
    })
  }

  private cleanUrl(url:string): string {
    // @ts-ignore
    return url.split('/').pop().slice(1, -1);
  }
}

interface Triple {
  subjectRdf:string,
  propertyRdf:string,
  objectRdf:string
}
