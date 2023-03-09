import { ResultTypes } from "@/errors/result-types";

export class GetFailedError extends Error {
  constructor(message?: string) {
    super(message || ResultTypes.FAIL_GET.$message);
  }
}
