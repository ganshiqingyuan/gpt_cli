import { Controller } from '@nestjs/common';
import { TestApiService } from '../service/test.api.service';

@Controller('test')
export class TestApiController {
	constructor(private readonly testApiService: TestApiService) {}
}
