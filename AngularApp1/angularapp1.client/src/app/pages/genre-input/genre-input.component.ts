import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiManagerService } from '../../services/api-manager.service';

@Component({
  selector: 'app-genre-input',
  templateUrl: './genre-input.component.html',
  styleUrl: './genre-input.component.css'
})
export class GenreInputComponent {
  genreForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiManagerService: ApiManagerService
  ) {
    this.genreForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  

  ngOnInit(): void {
    const genreId = this.route.snapshot.paramMap.get('id');
    if (genreId) {
      this.loadGenre(parseInt(genreId, 10));
    }
  }

  loadGenre(id: number): void {
    this.apiManagerService.getGenre(id).subscribe(genre => {
      this.genreForm.patchValue({
        name: genre.name,
      });  
    });
  }

  onSubmit(): void {
    const formValue = this.genreForm.value;
    const genre: any = {
      name: formValue.name,
    };
    const genreId  =this.route.snapshot.paramMap.get('id');
    if (genreId) {
      this.apiManagerService.updateGenre(parseInt(genreId, 10),genre).subscribe(() => {
        this.router.navigate(['/genre-info']);
      });
    } else {
      this.apiManagerService.addGenre(genre).subscribe(() => {
        this.router.navigate(['/genre-info']);
      });
    }
  }

  
}

