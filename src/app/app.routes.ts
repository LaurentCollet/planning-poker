import { Routes } from '@angular/router';
import {HomeView} from "./views/home-view/home-view.component";
import {SessionView} from "./views/session-view/session-view.component";
import {ErrorView} from "./views/error-view/error-view.component";

export const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "home"},
  {component: HomeView, path: "home"},
  {component: SessionView, path: "sessions/:sessionId"},
  {path: "error", component: ErrorView},
  {path: "**", redirectTo: "error"},
];
