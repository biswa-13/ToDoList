import { Component, OnInit } from '@angular/core';
import Task from '../../models/task';
import { TaskService } from 'src/app/task.service';
import { Router, RouterLinkActive, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  listId:string;
  constructor(
    private taskService:TaskService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
     this.activatedRoute.params.subscribe(
      (params:Params) => {
        this.listId = params.listId;
      }
     );
   }

  ngOnInit() {
  }

  creatTask(taskName:string){
    console.log("creatTask() is called -->",taskName);
    this.taskService.createTask(this.listId, taskName).subscribe(
      (task:Task) => {
        console.log("Task Created Succesfully -->", task._id);
        this.router.navigate (["../"], {relativeTo: this.activatedRoute});
      }
    );
  }
}
