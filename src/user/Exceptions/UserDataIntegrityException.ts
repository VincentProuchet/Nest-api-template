import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDataIntegrityException extends HttpException {
	constructor(message: string = 'nothing ') {
		super(message, HttpStatus.BAD_REQUEST);
	}
}
