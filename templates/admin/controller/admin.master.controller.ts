import { Controller } from "@nestjs/common";
import { {{uperName}}MasterService } from "../service/{{name}}.master.service";

@Controller("{{name}}")
export class {{uperName}}MasterController {
  constructor(private readonly {{name}}MasterService: {{uperName}}MasterService) {}
}
