import { ResultTypes } from "@/errors/result-types";

export class RegisterFailedError extends Error {
  constructor(message?: string) {
    super(message || ResultTypes.FAIL_REGISTER.$message);
  }
}
