import { Component, computed, inject, OnInit, Signal, WritableSignal } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {

_UsersService = inject(UsersService)


userAccountPhoto:Signal<string>=computed(()=>this._UsersService.userPhoto())






}
