import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../core/services/posts.service';
import { Ipost } from '../../core/interfaces/ipost';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommentsComponent , DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit  , OnDestroy{

detailsSub!:Subscription
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _PostsService = inject(PostsService)

  detailsList : Ipost | null = null

ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let idPost = p.get('id')
       this.detailsSub =  this._PostsService.getSinglePost(idPost).subscribe({
          next: (res) => {
            // console.log(res.post)
            this.detailsList=res.post

          }
        })

      }
    })
}

ngOnDestroy(): void {
    this.detailsSub?.unsubscribe()
}

}
