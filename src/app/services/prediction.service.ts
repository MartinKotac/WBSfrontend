import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private rdfGraphSubject = new BehaviorSubject<string | null>(null);

  constructor() {
  }

  setPredictionData(predictionData: string): void {
    this.rdfGraphSubject.next(predictionData)
  }

  getPredictionData(): Observable<any> {
    return this.rdfGraphSubject.asObservable();
  }
}
