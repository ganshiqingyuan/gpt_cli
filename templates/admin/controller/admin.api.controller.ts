import { Controller } from '@nestjs/common';
import { {{uperName}}ApiService } from '../service/{{name}}.api.service';

@Controller('{{name}}')
export class {{uperName}}ApiController {
	constructor(private readonly {{name}}ApiService: {{uperName}}ApiService) {}
}
