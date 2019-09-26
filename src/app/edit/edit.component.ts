import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
customerForm;
  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient, public router: Router) {
    this.customerForm = new FormGroup({
      'customerName': new FormControl(),
      'Location': new FormControl(),
      'Address': new FormControl(),
      
    });
   }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.paramMap.get("id"));

    this.http.get(`http://localhost:3000/employees/${this.activatedRoute.snapshot.paramMap.get("id")}`)
    .toPromise()
    .then((res:any)=>{
      this.customerForm.setValue({
        'name': res.name,
      'age': res.age,
      'city': res.city,
      
      })
    }, (err) => {
        console.log("error");
    })
  }


  postForm(){
    this.http.put(`http://localhost:3000/employees/${this.activatedRoute.snapshot.paramMap.get("id")}`,
    this.customerForm.value)
    .toPromise()
    .then((res)=>{
      this.router.navigate([""]);
    },(err)=>{
      console.log(err);
    });
  };
}
