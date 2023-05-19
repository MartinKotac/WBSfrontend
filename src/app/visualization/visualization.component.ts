import {Component, OnInit} from '@angular/core';
import {PredictionService} from "../services/prediction.service";

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  rdfGraphJsonLd!: string;

  constructor(private predictionService: PredictionService) {
  }

  ngOnInit(): void {
    this.predictionService.getPredictionData().subscribe(data => {
      this.rdfGraphJsonLd = data;
      console.log("Visualization Component", this.rdfGraphJsonLd)
    })
  }
}
