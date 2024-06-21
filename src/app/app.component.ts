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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
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
      id: 10,
      name: 'Autism',
      control: new FormControl(false),
    },
    {
      id: 11,
      name: 'ADHD',
      control: new FormControl(false),
    },
    {
      id: 12,
      name: 'CEREBRAL PALSY',
      control: new FormControl(false),
    },
    {
      id: 13,
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

  selectedDisabilities: string[] = [];

  private formBuilder = inject(FormBuilder);
  public censusForm = signal<FormGroup>(this.formBuilder.group({}));

  ngOnInit(): void {
    this.initForm();
    // this.initTypeOfDisability();
    // this.initCongenitalInborn();
    // this.initAcquired();
  }

  private initForm(): void {
    this.censusForm.set(
      this.formBuilder.group({
        surname: ['', Validators.required],
        givenName: ['', Validators.required],
        mi: [''],
        nickName: [''],
        dob: ['', Validators.required],
        placeOfBirth: ['', Validators.required],
        gender: ['', Validators.required],
        pwdNumber: [''],
        civilStatus: ['', Validators.required],
        numberOfChildren: [''],
        address: ['', Validators.required],
        telNo: [''],
        cellphoneNo: [''],
        noOfChildren: [''],
        occupation: [''],
        workAddress: [''],
        workTelNo: [''],
        fathersName: [''],
        fatherOccupation: [''],
        mothersName: [''],
        mothersOccupation: [''],
        specifyCondition: [''],
        spouseName: [''],
        spouseOccupation: [''],
        guardiansName: [''],
        guardiansOccupation: [''],
        disability: this.formBuilder.array([]),
        congenitalInBorn: this.formBuilder.array([]),
        acquireds: this.formBuilder.array([]),
        gadgets: this.formBuilder.array([]),
        congenitalInborn: [''],
        rehabService: [],
        rehabReason: [''],
        anyMember: [],
        relation: [],
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

  // initTypeOfDisability() {
  //   const controlArray = this.censusForm().get('typeOfDisability') as FormArray;
  //   this.disabilities.forEach(() => {
  //     controlArray.push(this.formBuilder.control(false));
  //   });
  // }

  // initCongenitalInborn() {
  //   const controlArray = this.censusForm().get('congenitalInborn') as FormArray;
  //   this.congenitalInBorns.forEach(() => {
  //     controlArray.push(this.formBuilder.control(false));
  //   });
  // }

  // initAcquired() {
  //   const controlArray = this.censusForm().get('acquired') as FormArray;
  //   this.acquireds.forEach(() => {
  //     controlArray.push(this.formBuilder.control(false));
  //   });
  // }
  public isFieldInvalid(fieldName: string): boolean | undefined {
    const field = this.censusForm().get(fieldName);
    return field?.invalid && (field.dirty || field.touched);
  }

  public onSave(): void {
    this.censusForm().markAllAsTouched();
    const zzz = this.censusForm().valid;
  }
}
