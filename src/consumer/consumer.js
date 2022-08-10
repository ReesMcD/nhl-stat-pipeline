import kafka from "../config/client.js";
import config from "../config/config.js";

export default kafka.consumer({ groupId: config.groupdId });
