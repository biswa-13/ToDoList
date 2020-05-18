import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { NewListComponent } from './pages/new-list/new-list.component'
import { NewTaskComponent } from './pages/new-task/new-task.component'


const routes: Routes = [
  {path:'', redirectTo:"lists", pathMatch:"full"},
  {path:"lists", component:TaskListComponent},
  {path:"lists/newList", component:NewListComponent},
  {path:"lists/:listId", component:TaskListComponent},
  {path:"lists/:listId/newList", component:NewTaskComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
