import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { CensusService } from '../services/census.service';
import {
  AcquiredCondition,
  CongenitalCondition,
  Disability,
  Person,
  PersonToSave,
} from '../interface';
import { omit } from 'lodash';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputFieldComponent,
  ],
})
export class AppComponent implements OnInit {
  public disabilities: {
    id: number;
    name: string;
    control: FormControl<boolean | null>;
  }[] = [
    {
      id: 1,
      name: 'Deaf or Hard of Hearing',
      control: new FormControl(false),
    },
    {
      id: 2,
      name: 'Intellectual Disability',
      control: new FormControl(false),
    },
    {
      id: 3,
      name: 'Speech and Language Communication Disorders',
      control: new FormControl(false),
    },
    {
      id: 4,
      name: 'Visually Impaired',
      control: new FormControl(false),
    },
    {
      id: 5,
      name: 'Mental Disability',
      control: new FormControl(false),
    },
    {
      id: 6,
      name: 'Psycho-Social Disability',
      control: new FormControl(false),
    },
    {
      id: 7,
      name: 'Physical Disability (Orthopedic)',
      control: new FormControl(false),
    },
    {
      id: 8,
      name: 'Rare Disability',
      control: new FormControl(false),
    },
  ];

  public congenitalInBorns: {
    id: number;
    name: string;
    control: FormControl<boolean | null>;
  }[] = [
    {
      id: 1,
      name: 'Autism',
      control: new FormControl(false),
    },
    {
      id: 2,
      name: 'ADHD',
      control: new FormControl(false),
    },
    {
      id: 3,
      name: 'CEREBRAL PALSY',
      control: new FormControl(false),
    },
    {
      id: 4,
      name: 'DOWN SYNDROME',
      control: new FormControl(false),
    },
  ];

  public acquireds: {
    id: number;
    name: string;
    control: FormControl<boolean | null>;
  }[] = [
    {
      id: 1,
      name: 'chronical illness',
      control: new FormControl(false),
    },
    {
      id: 2,
      name: 'CEREBRAL PALSY',
      control: new FormControl(false),
    },
    {
      id: 3,
      name: 'injury',
      control: new FormControl(false),
    },
  ];

  public gadgets: {
    id: number;
    name: string;
    control: FormControl<boolean | null>;
  }[] = [
    {
      id: 1,
      name: 'Wheelchair',
      control: new FormControl(false),
    },
    {
      id: 2,
      name: 'crutches',
      control: new FormControl(false),
    },
    {
      id: 3,
      name: 'hearing aid',
      control: new FormControl(false),
    },
    {
      id: 4,
      name: 'eyeglasses',
      control: new FormControl(false),
    },
    {
      id: 5,
      name: 'others',
      control: new FormControl(false),
    },
  ];

  private censusService = inject(CensusService);
  selectedDisabilities: string[] = [];

  private formBuilder = inject(FormBuilder);
  public censusForm = signal<FormGroup>(this.formBuilder.group({}));

  ngOnInit(): void {
    this.initForm();
    this.toggleChildCongenitalInbornCheckboxes(false);
  }

  private initForm(): void {
    this.censusForm.set(
      this.formBuilder.group({
        surname: ['xx', Validators.required],
        givenName: ['xx', Validators.required],
        mi: ['xx'],
        nickName: ['xx'],
        dateOfBirth: ['1977-11-16', Validators.required],
        placeOfBirth: ['xxxx', Validators.required],
        gender: ['Male', Validators.required],
        pwdNumber: ['122333'],
        civilStatus: ['Single', Validators.required],
        numberOfChildren: [100],
        address: ['address alng', Validators.required],
        telNo: ['tel no 11'],
        cellphoneNo: ['cell phone 22'],
        occupation: ['occupation'],
        workAddress: ['work address'],
        workTelNo: ['work tel no'],
        fathersName: ['fathers name'],
        fatherOccupation: ['fathers occupation'],
        mothersName: ['mothers name'],
        mothersOccupation: ['mother occupation'],
        spouseName: ['spouse name'],
        spouseOccupation: ['spouse occupation'],
        guardiansName: ['guardian name'],
        guardiansOccupation: ['guardian occupation'],
        specifyCondition: ['special condition'],
        disabilities: this.formBuilder.array(
          this.disabilities.map((disability) => {
            return {
              id: disability.id,
              control: disability.control,
            };
          })
        ),
        congenitalInBorns: this.formBuilder.array(
          this.congenitalInBorns.map((congenitalInBorn) => {
            return {
              id: congenitalInBorn.id,
              control: congenitalInBorn.control,
            };
          })
        ),
        acquireds: this.formBuilder.array(
          this.acquireds.map((acquired) => {
            return {
              id: acquired.id,
              control: acquired.control,
            };
          })
        ),
        congenitalInborn: [false],
        acquired: [false],
        // congenitalInBorn: this.formBuilder.array([]),
        // acquireds: this.formBuilder.array([]),
        // gadgets: this.formBuilder.array([]),
        // congenitalInborn: [''],
        // rehabService: [],
        // rehabReason: [''],
        // anyMember: [],
        // relation: [],
        // acquired: this.formBuilder.array([]),
        // wheelchair: [''],
        // disabilityTypes: this.formBuilder.array([]),
        // congenitalInborn: this.formBuilder.array([]),
        // acquired: this.formBuilder.array([]),
        // acquiredCheckbox: this.formBuilder.array([]),
        // condition: [''],
      })
    );
  }

  public onCongenitalInbornChange(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.toggleChildCongenitalInbornCheckboxes(isChecked);
  }

  private toggleChildCongenitalInbornCheckboxes(isChecked: boolean): void {
    if (isChecked) {
      this.enableChildCheckboxes();
    } else {
      this.disableChildCheckboxes();
    }
  }

  private enableChildCheckboxes(): void {
    this.congenitalInBorns.forEach((item) => {
      item.control.enable();
    });
  }

  // Disable child checkboxes
  private disableChildCheckboxes(): void {
    this.congenitalInBorns.forEach((item) => {
      item.control.setValue(false);
      item.control.disable();
    });
  }

  public onSave(): void {
    this.censusForm().markAllAsTouched();
    // const person = this.censusForm().value as Person;
    const person: Person = { ...(this.censusForm().value as Person) };
    debugger;

    // const xxx: number[] = person.disabilities
    //   .filter((disability) => disability.control.value === true)
    //   .map((disability) => disability.id);

    const personDisability: Disability = {
      disabilityID: person.disabilities
        .filter((disability) => disability.control.value === true)
        .map((disability) => disability.id),
    };

    const congenitalCondition: CongenitalCondition = {
      conditionID: person.congenitalInBorns
        .filter((congenitalInBorn) => congenitalInBorn.control.value === true)
        .map((congenitalInBorn) => congenitalInBorn.id),
    };

    const acquiredCondition: AcquiredCondition = {
      conditionID: person.acquireds
        .filter((acquired) => acquired.control.value === true)
        .map((acquired) => acquired.id),
    };

    const propertiesToRemove = [
      'acquireds',
      'congenitalInBorns',
      'disabilities',
      'TypeOfDisability',
    ];
    const modifiedPerson = omit(person, propertiesToRemove) as Person;

    const personToSave: PersonToSave = {
      person: modifiedPerson,
      disability: personDisability,
      congenitalCondition,
      acquiredCondition,
    };
    debugger;
    console.log(JSON.stringify(personToSave));
    this.censusService.addPerson(personToSave).subscribe(() => alert('xxx'));

    // const zzz = this.censusForm().valid;
  }
}
