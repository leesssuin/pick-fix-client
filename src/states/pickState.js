import { selectorFamily } from "recoil";
import { getMyPicks } from "../util/api/myPick";

export const pickState = selectorFamily({
  key: "pickState",
  get: (userId) => async () => {
    const result = await getMyPicks(userId);

    return result.data;
  },
});
