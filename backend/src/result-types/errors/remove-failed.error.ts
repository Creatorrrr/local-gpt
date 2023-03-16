import { ResultTypes } from "@/result-types/result-types";

export class RemoveFailedError extends Error {
  constructor(message?: string) {
    super(message || ResultTypes.FAIL_REMOVE.$message);
  }
}
