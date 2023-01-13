
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
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
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {
  MatChipList,
  MatChipsModule,
} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatChipInputEvent } from '@angular/material/chips';
import { HttpClientModule } from '@angular/common/http';
import { Reporting, TstFormService } from '../tst-form.service'
import { MatButtonModule } from '@angular/material/button';


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
    MatAutocompleteModule, MatIconModule, HttpClientModule], providers: [TstFormService]
})
export class TstFormComponent implements OnInit {
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
    private service: TstFormService,

  ) { }

  ngOnInit(): void {

    const op = JSON.parse(JSON.stringify(
      {
        "id": 1,
        "author": {
          "first_name": "khaoula",
          "last_name": "mdada",
          "birth_date": "5-01-2023",
          "sex": "Femme",
          "email": "kha@gmail.com"
        },
        "description": "dfgh,j./",
        "observations": [
          {
            "id": 1,
            "name": "Observation 1",
          },
          {
            "id": 2,
            "name": "Observation 2",
          },
        ]
      }))
    if (this.action === 'update') {
      this.service.buildForm(op)
      this.observations = op.observations as Observation[]
      this.filteredObservations = this.allObservations.filter((e: Observation) => !op.observations.map((x: Observation) => x.id).includes(e.id))
    }
    else { this.service.buildForm(); this.filteredObservations = this.allObservations; }
    this.form = this.service.form;
  }

  submitFunc() {
    this.service.submitForm();
    this.service.reset();
    this.observations = []
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


