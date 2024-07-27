import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiManagerService } from '../../services/api-manager.service';

@Component({
  selector: 'app-developer-input',
  templateUrl: './developer-input.component.html',
  styleUrl: './developer-input.component.css'
})
export class DeveloperInputComponent {
  developerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiManagerService: ApiManagerService
  ) {
    this.developerForm = this.fb.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
    });
  }
  

  ngOnInit(): void {
    const developerId = this.route.snapshot.paramMap.get('id');
    if (developerId) {
      this.loadDeveloper(parseInt(developerId, 10));
    }
  }

  loadDeveloper(id: number): void {
    this.apiManagerService.getDeveloper(id).subscribe(developer => {
      this.developerForm.patchValue({
        name: developer.name,
        country: developer.country
      });  
    });
  }

  onSubmit(): void {
    const formValue = this.developerForm.value;
    const developer: any = {
      name: formValue.name,
      country: formValue.country
    };
    console.log(developer);
    const developerId  =this.route.snapshot.paramMap.get('id');
    if (developerId) {
      this.apiManagerService.updateDeveloper(parseInt(developerId, 10),developer).subscribe(() => {
        this.router.navigate(['/developer-info']);
      });
    } else {
      this.apiManagerService.addDeveloper(developer).subscribe(() => {
        this.router.navigate(['/developer-info']);
      });
    }
  }

  
}
