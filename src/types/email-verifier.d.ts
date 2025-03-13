declare module "email-verifier" {
  interface VerificationData {
    validFormat: string;
    dns: string;
    smtp: string;
    disposable: string;
    catchAll: string;
    free: string;
    mxs: string[];
  }

  class Verifier {
    constructor(apiKey: string);
    verify(email: string, callback: (err: Error | null, data: VerificationData) => void): void;
  }

  export default Verifier;
}
