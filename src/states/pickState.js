import { atom, selectorFamily } from "recoil";
import { getMyPicks } from "../util/api/myPick";

export const pickState = atom({
  key: "picks",
  default: {},
});

// export const picksState = selectorFamily({
//   key: "pick",
//   get: (userId) => async () => {
//     console.log(userId);
//     const result = await getMyPicks(userId);
//     return result.data;
//   },
// });
