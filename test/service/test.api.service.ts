import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '../entity/test.entity';

@Injectable()
export class TestApiService {
	constructor(
		@InjectRepository(Test)
		private test: Repository<Test>,
	) {}
}
