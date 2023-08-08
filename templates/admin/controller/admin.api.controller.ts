import { Controller } from '@nestjs/common';
import { AdminApiService } from '../service/admin.api.service';

@Controller('admin')
export class AdminApiController {
	constructor(private readonly adminApiService: AdminApiService) {}
}
