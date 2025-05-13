import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreProgressComponent } from './genre-progress.component';

describe('GenreProgressComponent', () => {
  let component: GenreProgressComponent;
  let fixture: ComponentFixture<GenreProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
