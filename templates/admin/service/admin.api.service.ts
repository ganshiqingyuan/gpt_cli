import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { {{uperName}} } from '../entity/{{name}}.entity';

@Injectable()
export class {{uperName}}ApiService {
	constructor(
		@InjectRepository({{uperName}})
		private {{repositoryName}}: Repository<{{uperName}}>,
	) {}
}
