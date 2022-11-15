import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDamageComponent } from './pokemon-damage.component';

describe('PokemonDamageComponent', () => {
  let component: PokemonDamageComponent;
  let fixture: ComponentFixture<PokemonDamageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonDamageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDamageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
