import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
customerForm;
  constructor(public http:HttpClient,public router:Router) {
    
   }

  ngOnInit() {
    this.customerForm = new FormGroup({
      'name': new FormControl(),
      'age': new FormControl(),
      'city': new FormControl(),
    });
  }

  postForm(){
    console.log(this.customerForm.value);
    this.http.post('http://localhost:3000/employees',this.customerForm.value)
    .toPromise()
    .then((res)=>{
      this.router.navigate([""]);
    },(err)=>{
      console.log(err);
    });
  };
}
