import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {VisualizationComponent} from "./visualization/visualization.component";
import {ExamplesComponent} from "./examples/examples.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'visualization', component: VisualizationComponent},
  {path: 'examples', component: ExamplesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
