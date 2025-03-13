import Verifier from "email-verifier";

interface VerificationData {
  validFormat: string;
  dns: string;
  smtp: string;
  disposable: string;
  catchAll: string;
}

const verifier = new Verifier(process.env.EMAIL_VERIFIER_API_KEY || "");

export async function verifyEmail(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    verifier.verify(email, (err: Error | null, data: VerificationData) => {
      if (err) {
        console.error("Email verification error:", err);
        reject(err);
        return;
      }

      // Check if the email is valid based on multiple criteria
      const isValid =
        data.validFormat === "OK" &&
        data.dns === "OK" &&
        data.smtp === "OK" &&
        data.disposable === "false" &&
        data.catchAll === "false";

      resolve(isValid);
    });
  });
}
