import { Controller } from "@nestjs/common";
import { TestMasterService } from "../service/test.master.service";

@Controller("test")
export class TestMasterController {
  constructor(private readonly testMasterService: TestMasterService) {}
}
