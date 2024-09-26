// do Not change the order!! order matters
export var BeeperStatus;
(function (BeeperStatus) {
    BeeperStatus[BeeperStatus["MANUFACTURED"] = 0] = "MANUFACTURED";
    BeeperStatus[BeeperStatus["ASSEMBLED"] = 1] = "ASSEMBLED";
    BeeperStatus[BeeperStatus["SHIPPED"] = 2] = "SHIPPED";
    BeeperStatus[BeeperStatus["DEPLOYED"] = 3] = "DEPLOYED";
    BeeperStatus[BeeperStatus["DETONATED"] = 4] = "DETONATED";
})(BeeperStatus || (BeeperStatus = {}));
