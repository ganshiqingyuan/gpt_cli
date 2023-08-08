import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminApiController } from './controller/admin.api.controller';
import { AdminMasterController } from './controller/admin.master.controller';
import { Admin } from './entity/admin.entity';
import { AdminApiService } from './service/admin.api.service';
import { AdminMasterService } from './service/admin.master.api.service';
import { AdminRpcService } from './service/admin.rpc.service';

@Module({
	imports: [TypeOrmModule.forFeature([Admin])],
	controllers: [AdminApiController, AdminMasterController],
	providers: [AdminApiService, AdminMasterService, AdminRpcService],
})
export class ActivityModule {}
