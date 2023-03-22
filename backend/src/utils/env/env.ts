import * as fs from "fs-extra";
import * as YAML from "yaml";

const content = fs.readFileSync(`env-${process.env.NODE_ENV || "development"}.yaml`, "utf8");
const env = YAML.parse(content);

export default env;
