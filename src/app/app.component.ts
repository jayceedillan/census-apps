import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'census-app';

  public disabilities: string[] = [
    'Deaf or Hard of Hearing',
    'Intellectual Disability',
    'Speech and Language Communication Disorders',
    'Visually Impaired',
    'Mental Disability',
    'Psycho-Social Disability',
    'Physical Disability (Orthopedic)',
    'Rare Disability',
  ];

  public congenitalInBorns: string[] = [
    'Autism',
    'ADHD',
    'CEREBRAL PALSY',
    'DOWN SYNDROME',
  ];

  public acquireds: string[] = [
    'chronical illness',
    'CEREBRAL PALSY',
    'injury',
  ];

  selectedDisabilities: string[] = [];
}
