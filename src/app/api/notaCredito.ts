import AxiosInstance from "@/lib/service/axios";
import { ENV } from "../../../utils/constants";
import { AuthController } from "@/lib/controller/auth.controller";

export class NotaCredito {
  async get_All_noteCredit() {
    const accestoken = AuthController.getAccessToken();
    try {
      const {
        data: {
          data: { data },
        },
      } = await AxiosInstance.get(
        `${ENV.URL_API}${ENV.ENDPOINTS.NOTECREDIT.DETAIL_ALL}`,
        {
          headers: {
            Authorization: `Bearer ${accestoken}`,
          },
        }
      );
      console.log(" date data ", data);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
