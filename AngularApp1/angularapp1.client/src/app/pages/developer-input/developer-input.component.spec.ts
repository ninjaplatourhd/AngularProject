import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperInputComponent } from './developer-input.component';

describe('DeveloperInputComponent', () => {
  let component: DeveloperInputComponent;
  let fixture: ComponentFixture<DeveloperInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeveloperInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeveloperInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
