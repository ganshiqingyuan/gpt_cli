import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestApiController } from './controller/test.api.controller';
import { TestMasterController } from './controller/test.master.controller';
import { Test } from './entity/test.entity';
import { TestApiService } from './service/test.api.service';
import { TestBaseService } from './service/test.base.service';
import { TestMasterService } from './service/test.master.service';
import { TestRpcService } from './service/test.rpc.service';

@Module({
	imports: [TypeOrmModule.forFeature([Test])],
	controllers: [TestApiController, TestMasterController],
	providers: [
		TestApiService,
		TestMasterService,
		TestRpcService,
		TestBaseService,
	],
})
export class TestModule {}
