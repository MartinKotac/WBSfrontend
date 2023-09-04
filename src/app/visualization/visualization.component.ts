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
  nodes: Node[] = [];
  links: Edge[] = [];
  showTriples: boolean = false;
  nodesIdsCounter: number = 0;

  constructor(private predictionService: PredictionService) {
  }

  ngOnInit(): void {
    this.predictionService.getPredictionData().subscribe(data => {
      this.rdfGraph = data['rdf_graph'];
      console.log(data['rdf_graph']);
      this.rdfGraph.forEach(triple => {
        this.pushIntoGraph(triple)
      })
    })
  }

  pushIntoGraph(triple: Triple) {
    const subjectCleaned = this.cleanUrl(triple.subjectRdf, false);
    const propertyCleaned = this.cleanUrl(triple.propertyRdf, false);
    const objectCleaned = this.cleanUrl(triple.objectRdf, true);

    console.log(subjectCleaned, "->", propertyCleaned, "->", objectCleaned);

    let subjectNode = this.findOrCreateNode(subjectCleaned);
    let objectNode = this.findOrCreateNode(objectCleaned);

    const propertyEdge = this.createEdge(
      Math.random().toString(),
      subjectNode.id,
      objectNode.id,
      propertyCleaned
    );

    this.links.push(propertyEdge);
  }

  findOrCreateNode(nodeId: string): Node {
    let foundNode = this.nodes.find(node => node.id === nodeId);

    if (!foundNode) {
      foundNode = this.createNode(nodeId, nodeId);
      this.nodes.push(foundNode);
    }
    return foundNode;
  }

  centerGraph() {
    this.center$.next(true)
  }

  createEdge(id: string, source: string, target: string, label: string): Edge {
    return {
      id,
      source,
      target,
      label
    };
  }

  createNode(id: string, label: string): Node {
    return {
      id,
      label
    };
  }

  cleanUrl(url: string, isObject: boolean): string {
    if (isObject)
      // @ts-ignore
      return url.split('/').pop().slice(0, -3);
    else
      // @ts-ignore
      return url.split('/').pop().slice(0, -1);
  }

  cleanLink(url: string) {
    return url.replace(/[<>]/g, "");
  }
}

interface Triple {
  subjectRdf: string,
  propertyRdf: string,
  objectRdf: string
}
