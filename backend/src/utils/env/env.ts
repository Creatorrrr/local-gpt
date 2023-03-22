import fs from "fs";
import YAML from "yaml";

const content = fs.readFileSync(`env-${process.env.NODE_ENV || "development"}.yaml`, "utf8");
const env = YAML.parse(content);

export default env;
