(function (metro, patcher) {
    'use strict';

    const IdleStore = metro.findByProps("getIdleSince", "isIdle");
    let unpatchGetIdleSince;
    let unpatchIsIdle;
    var index = {
        onLoad: () => {
            if (!IdleStore)
                return;
            unpatchGetIdleSince = patcher.instead("getIdleSince", IdleStore, () => 0);
            unpatchIsIdle = patcher.instead("isIdle", IdleStore, () => false);
        },
        onUnload: () => {
            if (unpatchGetIdleSince)
                unpatchGetIdleSince();
            if (unpatchIsIdle)
                unpatchIsIdle();
        },
    };

    return index;

})(vendetta.metro, vendetta.patcher);
