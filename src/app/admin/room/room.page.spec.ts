import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomPage } from './room.page';

describe('RoomPage', () => {
  let component: RoomPage;
  let fixture: ComponentFixture<RoomPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
