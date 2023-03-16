import { ResultTypes } from "@/errors/result-types";

export class ModifyFailedError extends Error {
  constructor(message?: string) {
    super(message || ResultTypes.FAIL_MODIFY.$message);
  }
}
