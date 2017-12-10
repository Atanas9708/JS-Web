import { TestBed, async, inject } from '@angular/core/testing';

import { AttackGuardGuard } from './attack-guard.guard';

describe('AttackGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttackGuardGuard]
    });
  });

  it('should ...', inject([AttackGuardGuard], (guard: AttackGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
