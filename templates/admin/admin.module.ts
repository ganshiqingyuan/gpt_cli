import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { {{uperName}}ApiController } from './controller/{{name}}.api.controller';
import { {{uperName}}MasterController } from './controller/{{name}}.master.controller';
import { {{uperName}} } from './entity/{{name}}.entity';
import { {{uperName}}ApiService } from './service/{{name}}.api.service';
import { {{uperName}}BaseService } from './service/{{name}}.base.service';
import { {{uperName}}MasterService } from './service/{{name}}.master.service';
import { {{uperName}}RpcService } from './service/{{name}}.rpc.service';

@Module({
	imports: [TypeOrmModule.forFeature([{{uperName}}])],
	controllers: [{{uperName}}ApiController, {{uperName}}MasterController],
	providers: [
		{{uperName}}ApiService,
		{{uperName}}MasterService,
		{{uperName}}RpcService,
		{{uperName}}BaseService,
	],
})
export class {{uperName}}Module {}
