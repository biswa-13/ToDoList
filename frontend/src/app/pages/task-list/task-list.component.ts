import { Component, OnInit } from '@angular/core';
import { WebService } from 'src/app/web.service';
import Task from 'src/app/models/task';
import List from 'src/app/models/list';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
//import { relative } from 'path';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  lists:List [] = [];
  tasks:Task [] = [];
  listId;
  constructor(
    private taskService : TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.taskService.getList().subscribe(
      (lists: List[]) => this.lists = lists
    );

    this.route.params.subscribe(
      (params:Params) => {
        this.listId = params.listId;
        if(this.listId != null){
          this.taskService.getTasks(this.listId).subscribe(
            (tasks:Task[]) => this.tasks = tasks
          );
        }
      }
    );
  }
  setTaskStatus(task:Task){
    this.taskService.markCompleted(this.listId, task).subscribe(
      (res) =>{ console.log("Task Status Updated ...");}
      )
  }

  deleteTask(task:Task, index){
    console.log("deleteTask() is called...");
    this.taskService.removeTask(task._listId, task._id).subscribe(
      (task:Task) => {
        console.log("Task Deleted Succesfully...");
        //this.tasks = this.tasks.filter( (t) => {t._id !== task._id })
        this.tasks.splice(index,1);
      }
    )
  }

  deleteList(list:List, index){
    console.log("deleteList() is called...", index);
    this.taskService.removeList( list._id).subscribe(
      (list:List) => {
        console.log("List Deleted Succesfully...");
        //this.lists = this.lists.filter( (t) => {t._id !== list._id })
        this.lists.splice(index,1);
      }
    )
  }  

  addTask(){
    console.log("Add Task is called...");
    if(!this.listId){
      alert("No valid ListId found...");
      return;
    }
    this.router.navigate(['./newList'], {relativeTo: this.route});
  }
 
}
