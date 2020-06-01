import { Component, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { browserRefresh } from '../../../app.component';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-view-testresults-list',
  templateUrl: './view-testresults-list.component.html',
  styleUrls: []
})
export class ViewTestresultsListComponent implements OnChanges {

  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;
  users: any[] = [];
  searchText: string;
  filters: Object;
  filteredUsers: any[] = [];
  userResultUri: string = 'http://localhost:4000/result';
  public browserRefresh: boolean;
  Result: any = [];
  config: any;
  query = "";
  state = "Activate";
  error = "";
  quizNumber = 1;
  status = "";
  userName = "";
  candidateDetails: any = [];
  candidateAssessmentDetails: any = [];
  mode: any;
  constructor(private ref: ChangeDetectorRef, private http: HttpClient, private route: ActivatedRoute, private router: Router, private apiService: ApiService) {
    this.config = {
      currentPage: 1,
      itemsPerPage: 5,
      totalItems: 0
    };
    route.queryParams.subscribe(
      params => this.config.currentPage = params['page'] ? params['page'] : 1);

  }

  ngOnChanges(): void {

    if (this.groupFilters) this.filterUserList(this.groupFilters, this.users);
    this.router.navigate(['/view-testresults'])
  }
  ngOnInit(): void {
    this.readResult();
  }
  filterUserList(filters: any, users: any): void {

    this.filteredUsers = this.users; //Reset User List
    const keys = Object.keys(filters);

    const filterUser = user => {
      let result = keys.map(key => {
        if (key == "employeeName" || key == "JRSS") {
          if (user.result_users[0][key]) {
            return String(user.result_users[0][key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
          }
        }

        else if (user[key]) {
          return String(user[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
        } else {
          return false;
        }
      });

      // To Clean Array from undefined if the age is passed so the map will fill the gap with (undefined)
      result = result.filter(it => it !== undefined);
      return result.reduce((acc, cur: any) => { return acc & cur }, 1)
    }
    this.filteredUsers = this.users.filter(filterUser);
    this.Result = this.filteredUsers

  }

  pageChange(newPage: number) {
    this.router.navigate(['/view-testresults'], { queryParams: { page: newPage } });
  }

  // Get all results
  getResults(): Observable<any> {
    return this.http.get(`${this.userResultUri}/getresult`);

  }
  // To Read the Results of Candidate
  readResult() {
    this.getResults().subscribe((data) => {
      this.Result = data;
      this.users = data
      this.filteredUsers = this.filteredUsers.length > 0 ? this.filteredUsers : this.users;
    })
  }

  //To read candidate details
  getCandidateDetails(username) {
      this.mode="displayModalBody";
      this.apiService.getCandidateDetails(username).subscribe((data) => {
             this.candidateDetails = data;
      })
  }


  /**
   * getCandidateAssessmentDetails.
   * @author A.George
   * 29May2020.
   */
  getCandidateAssessmentDetails(userid,quizId,username) {
     this.userName=username;
     this.quizNumber=quizId;
     this.mode="displayAssessmentModalBody";
     this.apiService.getCandidateAssessmentDetails(userid).subscribe((data) => {
     this.candidateAssessmentDetails = data;
     })
 }

}
