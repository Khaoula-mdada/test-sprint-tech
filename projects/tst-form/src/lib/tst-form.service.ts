import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, debounceTime, map, Observable, throwError } from 'rxjs';
import { Observation, Reporting, ReportingAnswer } from './types';



@Injectable(
)
export class TstFormService implements OnInit {

  defaultUserInput: Reporting = {
    author: {
      first_name: '',
      last_name: '',
      birth_date: '',
      sex: '',
      email: '',
    },
    description: '',
    observations: []
  }
  reporting: ReportingAnswer | null = null
  private baseUrl: string = "../../../../../assets/app-data.json";
  private input: Reporting = this.defaultUserInput

  pattern = '[A-z0-9 ]{4,50}';
  message = ''
  constructor(private datePipe: DatePipe, private http: HttpClient, private route: ActivatedRoute) {
    this.initForm()
  }
  public form: FormGroup = new FormGroup({});
  ngOnInit(): void {

  }
  initForm() {
    let id: number | null = null
    if (this.route?.params) {
      this.route?.params.subscribe(params => {
        id = parseInt(params['id'])
      });
    }
    if (id) {
      this.http.get(`${this.baseUrl}`).subscribe((data: any) => {
        if (data && id) {
          const reporting = data.reportings.map((x: any) => JSON.parse(JSON.stringify(x))).filter((e: ReportingAnswer) => { return e.id === id })[0]
          if (reporting) { this.buildForm(reporting) }
          console.log(reporting)
        }
      })
    }
    else { this.buildForm(this.defaultUserInput) }
  }

  buildForm(userInput: ReportingAnswer | Reporting) {

    this.form.addControl('observationsControl', new FormControl(userInput.observations));
    this.form.addControl('first_nameControl', new FormControl(userInput.author.first_name, [
      Validators.required,
      Validators.pattern(this.pattern),
    ]));

    this.form.addControl('emailControl', new FormControl(userInput.author.email, [
      Validators.required,
      Validators.email,
    ]));
    this.form.addControl('last_nameControl', new FormControl(userInput.author.last_name, [
      Validators.required,
      Validators.pattern(this.pattern),
    ]));
    this.form.addControl('birth_dateControl', new FormControl(new Date(userInput.author.birth_date)));
    this.form.addControl('sexControl', new FormControl(userInput.author.sex));
    this.form.addControl('descriptionControl', new FormControl(userInput.description));
  }


  submitForm() {
    if (this.form) {
      this.input.author.last_name = this.form.get('last_nameControl')?.value
      this.input.author.first_name = this.form.get('first_nameControl')?.value
      this.input.author.birth_date = this.datePipe.transform(this.form.get('birth_dateControl')?.value, "yyyy-mm-dd") || "dd-MM-yyyy"
      this.input.author.email = this.form.get('emailControl')?.value
      this.input.author.sex = this.form.get('sexControl')?.value
      this.input.description = this.form.get('descriptionControl')?.value
      this.input.observations = this.form.get('observationsControl')?.value
    }
    this.createProduct(this.input)
    this.form.reset()
    this.initForm()

  }

  reset() {
    this.form.reset()
  }

  public getReporting(): Observable<Reporting[]> {
    return this.http.get<any[]>('../../../../../assets/app-data.json').pipe(
      map((reportings: any[]) => {
        return reportings.map((e) => {
          return JSON.parse(JSON.stringify(e)) as Reporting
        })
      })

    );
  }

  createProduct(reporting: Reporting) {
    this.http.post<HttpErrorResponse>(`${this.baseUrl}`, reporting).subscribe(
      (response: HttpErrorResponse) => {
        response.status === 204 ? this.message = 'Signalement ajouté' : response.status === 204 ? this.message = 'Email existe deja' : this.message = 'Une Erreur s est produite, merci de renouveller votre demande ulterieurement'
      }
    )
  }

  editProduct(reporting: ReportingAnswer) {
    this.http.post<HttpErrorResponse>(`${this.baseUrl}` + reporting.id, reporting).subscribe(
      (response: HttpErrorResponse) => {
        response.status === 204 ? this.message = 'Modification faite' : response.status === 204 ? this.message = 'Email existe deja' : this.message = 'Une Erreur s est produite, merci de renouveller votre demande ulterieurement'
      }

    );
  }

  public getObservations(): Observable<Observation[]> {
    return this.http.get<any[]>(`${this.baseUrl}`).pipe(
      map((observations: any[]) => {
        return observations.map((e) => {
          return JSON.parse(JSON.stringify(e)) as Observation
        })
      })
    );
  }

}





