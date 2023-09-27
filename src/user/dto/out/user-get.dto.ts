interface IUserGetDto {
  id: number;
  email: string;
  firstname?: string;
  lastname?: string;
  avatarUrl?: string;
}

export class UserGetDto {
  id: number;
  email: string;
  firstname?: string;
  lastname?: string;
  avatarUrl?: string;

  constructor(data?: IUserGetDto) {
    if (data) {
      this.id = data['id'];
      this.email = data['email'];
      this.firstname = data['firstname'];
      this.lastname = data['lastname'];
      this.avatarUrl = data['avatarUrl'];
    }
  }
}
