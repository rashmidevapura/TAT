import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-pre-tech-form',
  templateUrl: './pre-tech-form.component.html',
  styleUrls: ['./pre-tech-form.component.css']
})
export class PreTechFormComponent implements OnInit {

  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService) { }
    result:any=[];

  ngOnInit(): void {
    
  this.apiService.getPreTechniaclQuestions("java","dd").subscribe(
    (res) => {
      console.log("Question successfully created! ",+res);  
      this.result=res;
                
      console.log('inhhhh',this.result)
      
    }, (error) => {
      console.log(error);
    });      } 
    getQuestions(){
      return this.result;
    }

}
