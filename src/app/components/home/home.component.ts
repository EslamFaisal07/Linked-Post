import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Subscription } from 'rxjs';
import { Ipost } from '../../core/interfaces/ipost';
import { PostsService } from '../../core/services/posts.service';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, CommentsComponent , FormsModule , NgClass , RouterLink  ,InfiniteScrollModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit , OnDestroy{

  allPostsSub !:Subscription
  creatPosts !:Subscription
  postList:WritableSignal<Ipost[]> = signal([])
  modelClose:boolean=false
  content:string = ""
  savedFile!:File|null



  private currentPage = 1;
  private isLoading = false;
  hasMoreData:boolean = true;


  onScroll(): void {

    if (this.isLoading || !this.hasMoreData) return;

    setTimeout(() => {
      this.currentPage++;
      this.loadPostes(this.currentPage);
    }, 1000);
  }
  loadPostes(page: number): void {
    if (this.isLoading || !this.hasMoreData) return;
    this.isLoading = true;

    this._PostsService.getAllPosts(page).subscribe({
      next: (data) => {
        if (data.posts.length === 0) {
          this.hasMoreData = false;
        } else {
          this.postList.set([...this.postList(), ...data.posts]);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }





  private readonly _PostsService = inject(PostsService)
  private readonly _ToastrService = inject(ToastrService)



  ngOnInit(): void {

    this.allPostsSub = this._PostsService.getAllPosts(1).subscribe({
      next:(res)=>{
        console.log(res.posts)
        this.postList.set(res.posts.reverse())

      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  close():void{
    this.modelClose = false
  }

  changeImage(e:Event):void{
    const input = e.target as HTMLInputElement

    if (input.files && input.files.length>0) {

      this.savedFile = input.files[0]


    }
  }



  creatPost():void{

const formData = new FormData()
formData.append('body' , this.content)
formData.append('image' , this.savedFile!)


    this.creatPosts = this._PostsService.createPost(formData).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.success('Done')


      }
    })

  }


ngOnDestroy(): void {
    this.allPostsSub?.unsubscribe()
    this.creatPosts?.unsubscribe()
}


}
