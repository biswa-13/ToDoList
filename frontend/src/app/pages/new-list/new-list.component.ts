import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import List from '../../models/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(
    private taskService:TaskService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  creatList(listName:string){
    console.log("creatList() is called -->",listName);
    this.taskService.createList(listName).subscribe(
      (list: List) => {
        console.log("List Created Succesfully() -->",list._id,"\n", list.title);
        this.router.navigate(['/lists', list._id]);
      }
    );
  }
}
