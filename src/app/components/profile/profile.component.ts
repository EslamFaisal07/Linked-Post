import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { Iprofile } from '../../core/interfaces/iprofile';
import { Subscription } from 'rxjs';
import { DatePipe, NgClass } from '@angular/common';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { RouterLink } from '@angular/router';
import { UsersService } from '../../core/services/users.service';
import { Idatauser } from '../../core/interfaces/idatauser';
import { Ipost } from '../../core/interfaces/ipost';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe, CommentsComponent , NgClass , RouterLink ,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit  , OnDestroy{



  dropdowns: { [key: string]: boolean } = {};

  toggleDropdown(postId: string) {
    this.dropdowns[postId] = !this.dropdowns[postId];
  }


profileList : WritableSignal<Iprofile[]> = signal([])
dataList : WritableSignal<Idatauser> = signal({} as Idatauser)
profileSub!:Subscription
dataSub!:Subscription
uploadPhotoSub!:Subscription
creatPosts !:Subscription


photoFile !:File



postList:WritableSignal<Ipost[]> = signal([])
content:string = ""
savedFile!:File|null



private readonly _PostsService = inject(PostsService)
private readonly _UsersService = inject(UsersService)
private readonly _ToastrService = inject(ToastrService)



ngOnInit(): void {

this.dataSub = this._UsersService.getLogedUserData().subscribe({
  next: (data) => {
    console.log(data.user);
    this.dataList.set(data.user)
    this._UsersService.userPhoto.set(data.user.photo)

  },
  error:(err)=>{
    console.log(err);

  }
})

this.profileSub =    this._PostsService.getMyPosts().subscribe({
      next: (res)=>{
        console.log(res.posts);
        this.profileList.set(res.posts)

      },
      error:(err)=>{
        console.log(err);

      }
    })
}

deletePost(id:string):void{
  this._PostsService.deletePost(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.ngOnInit()
      this._ToastrService.error("Your Post Deleted Successfully")


    },
    error:(err)=>{
      console.log(err);

    }
  })

}

photoChange(e:Event):void{
  const input =e.target as HTMLInputElement
  if (input.files && input.files.length>0) {

    this.photoFile = input.files[0]

  }


}

uploadPhoto():void{
  const formData = new FormData()
  formData.append('photo' , this.photoFile)

this.uploadPhotoSub = this._UsersService.uploadProfilePhoto(formData).subscribe({
  next:(res)=>{
    console.log(res);

    if (res.message == 'success') {
      this.ngOnInit()
      this._ToastrService.error("Success Change ")


    }

  },
  error:(err)=>{
    console.log(err);

  }
})


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
    }
  })

}



ngOnDestroy(): void {
    this.dataSub?.unsubscribe()
    this.uploadPhotoSub?.unsubscribe()
    this.profileSub?.unsubscribe()
    this.creatPosts?.unsubscribe()
}
}
