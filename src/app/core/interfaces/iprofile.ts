


export interface Iprofile {

  _id: string;
  body: string;
  image: string;
  user: User;
  createdAt: string;
  comments: any[];
  id: string;
}

interface User {
  _id: string;
  name: string;
  photo: string;
}
