import { IsOptional, IsString } from "class-validator";
import { validator } from "@medusajs/medusa/dist/utils";
import AttributeService from "../../services/attribute";
import { RegionService, UserService } from "@medusajs/medusa";

export default async (req, res) => {
  const validated = await validator(AdminListAttributesParams, req.query);

  const attributeService: AttributeService =
    req.scope.resolve("attributeService");

  const attributes = await attributeService.list(validated);

  res.json({ attributes });
};

export class AdminListAttributesParams {
  @IsOptional()
  @IsString({ each: true })
  categories?: string[]; // Categories handle

  @IsOptional()
  @IsString({ each: true })
  handle?: string; // Attribute handle
}
