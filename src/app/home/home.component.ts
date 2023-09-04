import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PredictionService} from "../services/prediction.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  corpusForm!: FormGroup;

  constructor(private predictionService: PredictionService,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.corpusForm = new FormGroup({
      corpus: new FormControl(null, Validators.required)
    });
  }

  onPredict(): void {
    if (this.corpusForm.valid) {
      const url = 'http://localhost:8000/predict'
      this.http.get<any>(url).subscribe(response => {
        console.log("Response: ", response);
        this.predictionService.setPredictionData(response);
        this.router.navigate(['/visualization'])
      }, error => {
        console.log(error)
      });
    }
  }
}
