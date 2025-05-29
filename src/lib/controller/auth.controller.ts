import { FactusAPI } from "@/app/api/factus.api";
import { FactusConfig } from "../../../utils/type";
import { ENV } from "../../../utils/constants";

function createFactusAPI(config: FactusConfig): FactusAPI {
  return new FactusAPI(config);
}

export const AuthController = createFactusAPI({
  client_id: ENV.CI,
  client_secret: ENV.CE,
});
