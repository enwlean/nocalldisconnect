import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

const IdleStore = findByProps("getIdleSince", "isIdle");

let unpatchGetIdleSince;
let unpatchIsIdle;

export default {
    onLoad: () => {
        if (!IdleStore) return;
        unpatchGetIdleSince = instead("getIdleSince", IdleStore, () => 0);
        unpatchIsIdle = instead("isIdle", IdleStore, () => false);
    },
    onUnload: () => {
        if (unpatchGetIdleSince) unpatchGetIdleSince();
        if (unpatchIsIdle) unpatchIsIdle();
    },
};
