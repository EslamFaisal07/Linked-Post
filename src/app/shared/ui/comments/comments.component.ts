import { Component, computed, inject,  Input,  OnInit, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentsService } from '../../../core/services/comments.service';
import { Icomment } from '../../../core/interfaces/icomment';
import { DatePipe, isPlatformBrowser, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe , ReactiveFormsModule ,NgClass],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {

  dropdowns: { [key: string]: boolean } = {};

  toggleDropdown(postId: string) {
    this.dropdowns[postId] = !this.dropdowns[postId];
  }


  @Input({required:true}) postId!:string

commentSub !:Subscription
commentsList:WritableSignal<Icomment[]> = signal([])


private readonly _CommentsService = inject(CommentsService)
private readonly _UsersService = inject(UsersService)
private readonly _FormBuilder = inject(FormBuilder)
private readonly _PLATFORM_ID = inject(PLATFORM_ID)


commentGroup !:FormGroup
UpdatecommentGroup !:FormGroup


commentContent: WritableSignal<string> = signal('')
userId!:string
userImg!:any





  ngOnInit(): void {

 this._UsersService.getLogedUserData().subscribe({
  next: (data) => {
    console.log(data);
    this.userId = data.user._id
    this.userImg = data.user.photo

  }
 })



    this.commentGroup = this._FormBuilder.group({
      content:[null],
      post:[this.postId],
    })

    this.UpdatecommentGroup = this._FormBuilder.group({
      content:[null],
      // this.commentGroup.get('content')?.value
    })


this.commentSub =this._CommentsService.getPostComment(this.postId).subscribe({
  next:(res)=>{
    console.log(res.comments);
    this.commentsList.set(res.comments.reverse())

  },
  error:(err)=>{
    console.log(err);

  }
})
  }





  sendComment():void{
    this._CommentsService.creatComment(this.commentGroup.value).subscribe({
      next:(res)=>{

        console.log(res);
        this.commentsList.set(res.comments.reverse())
        this.commentGroup.get('content')?.reset()

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }



  delete(id:string):void{
    this._CommentsService.deleteComment(id).subscribe({
      next:(res)=>{
        // console.log(res.comments);

    this.ngOnInit()



      },
      error:(err)=>{
        console.log(err);

      }
    })
  }



  updateComments(id:string ):void{

    this._CommentsService.updateComment(id , this.UpdatecommentGroup.value).subscribe({
      next:(res)=>{
        console.log(res);




if (res.message === 'success') {
  // this.commentsList.set(res.comments)
  this.commentContent.set(res.comment.content)

  this.UpdatecommentGroup.get('content')?.reset()


}



      },
      error:(err)=>{
        console.log(err);

      }
    })




  }

}
