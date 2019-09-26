import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
customerList;
  constructor(public http: HttpClient) { }
 

  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.http.get('http://localhost:3000/employees')
    .toPromise()
    .then((res)=>{
      this.customerList = res;
    }, (err) => {
      console.log("error");
    });
  }


  deleteForm(id){
    let result = confirm("Are you sure you want to delete this data?");
    if(result == true) {
      console.log(id);
      this.http.delete(`http://localhost:3000/employees/${id}`)
      .toPromise()
      .then((res)=>{
        this.loadData();
      },(err)=>{
        console.log("error");
      })
    }
  }
}
