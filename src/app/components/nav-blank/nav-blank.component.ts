import { Component, computed, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {




_UsersService = inject(UsersService)


userPhoto:Signal<string>=computed(()=>this._UsersService.userPhoto())







}
