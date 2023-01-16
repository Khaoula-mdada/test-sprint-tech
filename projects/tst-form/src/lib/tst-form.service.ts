import { DatePipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, debounceTime, map, Observable, throwError } from 'rxjs';
import { Observation, Reporting, ReportingAnswer } from './types';



@Injectable(
)
export class TstFormService {

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
  id: number | null = null
  pattern = '[A-z0-9 ]{4,50}';
  message$ = new BehaviorSubject<string>("");
  observations$ = new BehaviorSubject<Observation[]>([]);
  constructor(private datePipe: DatePipe, private http: HttpClient, private route: ActivatedRoute) {
    this.initForm()
  }
  public form: FormGroup = new FormGroup({});

  initForm() {
    this.getObservations()
    if (this.route?.params) {
      this.route?.params.subscribe(params => {
        this.id = parseInt(params['id'])
      });
    }
    if (this.id) {
      this.http.get(`${this.baseUrl}`).subscribe((data: any) => {
        if (data && this.id) {
          const reporting = data.reportings.map((x: any) => JSON.parse(JSON.stringify(x))).filter((e: ReportingAnswer) => { return e.id === this.id })[0]
          if (reporting) { this.buildForm(reporting) }
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
    if (!this.id) { this.createProduct(this.input) } else { this.editProduct(this.input, this.id)}
  }

  reset() {
     this.form.get('last_nameControl')?.setValue( this.defaultUserInput.author.last_name)
     this.form.get('first_nameControl')?.setValue(this.defaultUserInput.author.first_name)
     this.form.get('birth_dateControl')?.setValue(this.defaultUserInput.author.birth_date)
     this.form.get('emailControl')?.setValue(this.defaultUserInput.author.email)
     this.form.get('sexControl')?.setValue(this.defaultUserInput.author.sex)
     this.form.get('descriptionControl')?.setValue(this.defaultUserInput.description)
     this.form.get('observationsControl')?.setValue(this.defaultUserInput.observations)
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

  createProduct(reporting: Reporting):void {
    this.http.post<HttpErrorResponse>(`${this.baseUrl}`, reporting).subscribe(
      data => { this.message$.next('Signalement ajouté!'); },
      err => {
        this.message$.next(err.status === 404 ? 'Email existe deja!' : 'Erreur inconnue');
      }
    )
  }

  editProduct(reporting: Reporting, id: number) :void{
    this.http.put<HttpErrorResponse>(`${this.baseUrl}` + id, reporting).subscribe(
      data => { this.message$.next('Signalement modifié') },
      err => {
        this.message$.next(err.status === 404 ? 'Email existe deja!' : 'Erreur inconnue');
      }
    )
  }

   getObservations(): void {
   this.http.get<any[]>(`${this.baseUrl}`
    ).subscribe((data: any) => {
      if (data ) {
        this.observations$.next(data.observations) 
      }
    });
  }

}





