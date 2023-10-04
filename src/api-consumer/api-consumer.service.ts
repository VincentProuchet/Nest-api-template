import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { join } from 'path';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ApiConsumerService {
  private baseUrl: string = process.env.EXTERNAL_API_BASE_URL ?? "";
  private responseType: string = "response_type=json"

  constructor(private readonly httpService: HttpService) {
  }

  async getUsers(usersNumber: number) {
    const { data } = await firstValueFrom(
      this.httpService.get<any>(join(this.baseUrl, "users", `?${this.responseType}&number=${usersNumber}`)).pipe(
        catchError((error: AxiosError) => {
          console.log(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    // const responseJson = this.httpService.get(join(this.baseUrl, "users", `?${this.responseType}&number=${usersNumber}`)).subscribe({
    //   next: () => {

    //   },
    //   error: () => {

    //   },
    //   complete: () => {

    //   }
    // });
    console.log(data);
  }

}
