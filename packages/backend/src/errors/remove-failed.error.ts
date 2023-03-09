import { ResultTypes } from "@/errors/result-types";

export class RemoveFailedError extends Error {
  constructor(message?: string) {
    super(message || ResultTypes.FAIL_REMOVE.$message);
  }
}
