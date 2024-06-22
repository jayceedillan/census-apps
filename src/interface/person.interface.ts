import { FormControl } from '@angular/forms';
import { Disability } from './disability.interface';
import { CongenitalCondition } from './congenital-condition.interface';
import { AcquiredCondition } from './acquired-condition.interface';

export interface Person {
  acquireds: FormElement[];
  address: string;
  cellphoneNo: string;
  civilStatus: string;
  congenitalInBorns: FormElement[];
  congenitalInborn: boolean;
  dateOfBirth: string;
  disabilities: FormElement[];
  fatherOccupation: string;
  fathersName: string;
  gender: string;
  givenName: string;
  guardiansName: string;
  guardiansOccupation: string;
  mi: string;
  mothersName: string;
  mothersOccupation: string;
  nickName: string;
  numberOfChildren: number;
  occupation: string;
  placeOfBirth: string;
  pwdNumber: string;
  specifyCondition: string;
  spouseName: string;
  spouseOccupation: string;
  surname: string;
  telNo: string;
  workAddress: string;
  workTel: string;
  acquired?: boolean;
}

interface FormElement {
  id: number;
  control: FormControl<boolean | null>;
  name: string;
}

export interface PersonToSave {
  person: Person;
  disability: Disability;
  congenitalCondition: CongenitalCondition;
  acquiredCondition: AcquiredCondition;
}
