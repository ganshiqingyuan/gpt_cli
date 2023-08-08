import { Controller } from '@nestjs/common';
import { AdminMasterService } from '../service/admin.master.api.service';

@Controller('admin')
export class AdminMasterController {
	constructor(private readonly adminMasterService: AdminMasterService) {}
}
