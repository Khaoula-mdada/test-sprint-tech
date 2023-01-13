import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


export interface Author {
  first_name: string
  last_name: string
  birth_date: string
  sex: string
  email: string
}
export interface Reporting {
  author: Author
  description: string
  observations: number[]
}

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
 
  private userInput: Reporting =this.defaultUserInput
  
  pattern = '[A-z0-9 ]{4,50}';
  constructor(private datePipe: DatePipe) {
    this.form.valueChanges.subscribe(() => {
    });
  }
  public form: FormGroup = new FormGroup({});

  buildForm(userInput:
    Reporting=this.userInput) {
    this.form.addControl('emailControl', new FormControl(userInput.author.email, [
      Validators.required,
      Validators.email,
    ]));
    this.form.addControl('last_nameControl', new FormControl(userInput.author.last_name, [
      Validators.required,
      Validators.pattern(this.pattern),
    ]));
    this.form.addControl('first_nameControl', new FormControl(userInput.author.first_name, [
      Validators.required,
      Validators.pattern(this.pattern),
    ]));
    this.form.addControl('birth_dateControl', new FormControl( new Date(userInput.author.birth_date)));
    this.form.addControl('sexControl', new FormControl(userInput.author.sex));
    this.form.addControl('descriptionControl', new FormControl(userInput.description));
    this.form.addControl('observationsControl', new FormControl( userInput.observations));
  }


  submitForm() {
    if (this.form) {
      this.userInput.author.last_name = this.form.get('last_nameControl')?.value
      this.userInput.author.first_name = this.form.get('first_nameControl')?.value
      this.userInput.author.birth_date = this.datePipe.transform(this.form.get('birth_dateControl')?.value, "dd-MM-yyyy") || "dd-MM-yyyy"
      this.userInput.author.email = this.form.get('emailControl')?.value
      this.userInput.author.sex = this.form.get('sexControl')?.value
      this.userInput.description = this.form.get('descriptionControl')?.value
      this.userInput.observations = this.form.get('observationsControl')?.value
    }
    console.log(" this.userInput", this.userInput)
  }

  reset() {
    this.form.reset()
  }

 


}
