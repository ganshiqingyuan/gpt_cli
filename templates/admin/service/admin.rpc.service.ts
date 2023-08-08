import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entity/admin.entity';

@Injectable()
export class AdminRpcService {
	constructor(
		@InjectRepository(Admin)
		private adminRepository: Repository<Admin>,
	) {}
}
