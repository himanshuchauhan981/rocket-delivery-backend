import { HttpException, Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { MESSAGES } from 'src/core/constants/messages';

import { USER_REPOSITORY } from 'src/core/constants/repositories';
import { STATUS_CODE } from 'src/core/constants/status_code';
import { CommonService } from '../common/common.service';
import { UserLogin, UserSignup } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {

	constructor(
		private readonly commonService: CommonService,
		@Inject(USER_REPOSITORY) private readonly userRepository: typeof User
	) {}

	async #findExistingUser(email: string, mobileNumber: string = null): Promise<User> {
		return await this.userRepository.findOne({
			where:{ [sequelize.Op.or]: [{ email: email },{ mobile_number: mobileNumber ? mobileNumber : null } ] },
			attributes: [
				'email',
				'password',
				'mobile_number',
				'name',
				'id',
				'profile_image',
			],
		});
	}

	async signup(payload: UserSignup) {
		try {
			const userDetails = await this.#findExistingUser(payload.email, payload.mobile_number);

			if(!userDetails) {
				const hashedPassword = await this.commonService.generateHashPassword(payload.password);

				const newUser = await this.userRepository.create<any>({
					name: payload.name,
					email: payload.email,
					password: hashedPassword,
					country_code: payload.country_code,
					mobile_number: payload.mobile_number,
					type: payload.type,
				});

				const token = this.commonService.generateJWTToken({
					id: newUser.id,
          role: 'user',
          email: payload.email
				});

				return { statusCode: STATUS_CODE.SUCCESS, message: MESSAGES.SUCCESS, data: { token } };
			}
			else {
				throw new HttpException(MESSAGES.USER_ALREADY_EXISTED, STATUS_CODE.CONFLICT);
			}
		}
		catch(err) {
			throw err;
		}
	}

	async login(payload: UserLogin) {
		try {
			const existingUser = await this.#findExistingUser(payload.email);

			if(existingUser) {
				const comparedPassword = await this.commonService.comparePassword(payload.password, existingUser.password);

				if(comparedPassword) {
					const token = this.commonService.generateJWTToken({
						id: existingUser.id,
						role: 'user',
						email: payload.email
					});

					await this.userRepository.update(
						{ fcm_token: payload.fcm_token }, 
						{ where: { id: existingUser.id } }
					)

					return {statusCode: STATUS_CODE.SUCCESS, data : { token }, message: MESSAGES.SUCCESS }
				}
				else {
					throw new HttpException(MESSAGES.INVALID_CREDS, STATUS_CODE.UNAUTHORIZED);
				}
			}
			else {
				throw new HttpException(MESSAGES.INVALID_CREDS, STATUS_CODE.UNAUTHORIZED);
			}
		}
		catch(err) {
			throw err;
		}
	}
}
