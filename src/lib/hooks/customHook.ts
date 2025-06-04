import { useCallback, useEffect, useState } from "react";
import { NoteCreditController } from "../controller/api.controller";
import { NotaCreditoAll } from "../../../utils/type";

export const useAllNoteCredit = () => {
  const [noteCreditAll, setNoteCreditAll] = useState<NotaCreditoAll[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchAllNoteCredit = useCallback(async () => {
    try {
      const res = await NoteCreditController.get_All_noteCredit();
      console.log(" response", res);
      setNoteCreditAll(res);
    } catch (error) {
      setNoteCreditAll([]);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllNoteCredit();
  }, [fetchAllNoteCredit]);

  return { isLoading, noteCreditAll };
};
