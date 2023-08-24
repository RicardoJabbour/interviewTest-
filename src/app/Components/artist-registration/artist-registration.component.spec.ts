import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistRegistrationComponent } from './artist-registration.component';

describe('ArtistRegistrationComponent', () => {
  let component: ArtistRegistrationComponent;
  let fixture: ComponentFixture<ArtistRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
