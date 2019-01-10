import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLotMapComponent } from './parking-lot-map.component';

describe('ParkingLotMapComponent', () => {
  let component: ParkingLotMapComponent;
  let fixture: ComponentFixture<ParkingLotMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingLotMapComponent ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingLotMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
