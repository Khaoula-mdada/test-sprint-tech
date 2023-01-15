
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild, AfterContentInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {
  MatChipList,
  MatChipsModule,
} from '@angular/material/chips';
import { COMMA, ENTER, X } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { TstFormService } from '../tst-form.service'
import { MatButtonModule } from '@angular/material/button';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';




interface Observation {
  id: number
  name: string
}
@Component({
  selector: 'tst-form',
  templateUrl: './tst-form.component.html',
  styleUrls: ['./tst-form.component.scss'],
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    NgIf,
    MatNativeDateModule,
    MatOptionModule,
    NgFor, MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule, MatIconModule, HttpClientModule], providers: [TstFormService],animations:[]
})
export class TstFormComponent implements OnInit, AfterContentInit {
  @Input() action = 'create' || 'update'
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  errors = new Map<string, string>([
    ['name-error', 'Votre nom doit comporter un maximum de 50 caractères.'],
    [
      'firstName-error',
      'Votre Prénom doit comporter un maximum de 50 caractères.',
    ],
    ['email-error', 'Email valide obligatoire.'],
  ]);
  genders = ['Homme', 'Femme', 'Non-binaire'];
  public allObservations: Observation[] = [
    {
      id: 1,
      name: "Observation 1",
    },
    {
      id: 2,
      name: "Observation 2",
    },
    {
      id: 3,
      name: "Observation 3",
    },
  ];
  maxDate = new Date(new Date().setFullYear(new Date().getFullYear() - 100));
  form: any;
  filteredObservations: any[] = [];
  observations: Observation[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('observationInput') observationInput:
    | ElementRef<HTMLInputElement>
    | undefined;
  @ViewChild('auto') matAutocomplete: MatAutocomplete | undefined;

  constructor(
    private service: TstFormService, private dateAdapter: DateAdapter<Date>,private route: Router

  ) {
    this.dateAdapter.setLocale('en-GB');
    this.form = this.service.form;

  }

  ngOnInit(): void {
  }
  ngAfterContentInit(): void {
    this.getObservations()
  }
  getObservations():void {
    if (this.action === 'update') {
      setTimeout(() => {
        this.observations = this.form.get('observationsControl')?.value as Observation[];
        this.filteredObservations = this.allObservations.filter((e: Observation) => !this.observations.map((x: Observation) => x.id).includes(e.id))
      }, 100)
    }
    else { this.filteredObservations = this.allObservations; }
  }

  submitFunc() {
    this.service.submitForm();
    this.observations = []
    if(this.action==='update'){this.service.reset();this.route.navigate(['/list'])}
    else{this.service.reset();this.route.navigate(['/create'])}
  }
  cancel(){
    if(this.action==='update'){this.service.reset();this.route.navigate(['/list'])}
    else{this.service.reset();this.route.navigate(['/create'])}
  }

  add(event: MatChipInputEvent): void {
    const value = event.value
    if (value) {
      this.observations.push(this.findobservation(value));
    }
    event.chipInput!.clear();
    this.form.get('observationsControl').setValue(this.observations.map(e => e.id));
  }

  remove(observation: Observation): void {
    const index = this.observations.indexOf(observation);
    if (index >= 0) {
      this.observations.splice(index, 1);
      this.filteredObservations.push(observation);
    }
  }

  findobservation(value: string) {
    return this.allObservations.filter(
      (observation) =>
        observation.name.toLowerCase() === value.toLowerCase()
    )[0];
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const obs = this.findobservation(event.option.viewValue)
    this.observations.push(obs)
    this.filteredObservations.splice(this.filteredObservations.indexOf(obs), 1);
    if (this.observationInput) this.observationInput.nativeElement.value = '';
  }

}


