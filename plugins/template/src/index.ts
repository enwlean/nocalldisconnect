import { findByProps } from "@vendetta/metro";
import { instead } from "@vendetta/patcher";

const IdleStore = findByProps("getIdleSince", "isIdle");

let patches = [];

export default {
    onLoad: () => {
        if (!IdleStore) return;

        // getIdleSince должен возвращать null, если вы активны
        patches.push(instead("getIdleSince", IdleStore, () => null));
        
        // isIdle всегда должен возвращать false
        patches.push(instead("isIdle", IdleStore, () => false));
    },
    onUnload: () => {
        // Очищаем все патчи разом
        patches.forEach(unpatch => unpatch());
        patches = [];
    },
};
