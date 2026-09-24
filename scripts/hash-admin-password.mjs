import { pbkdf2Sync, randomBytes } from "node:crypto";
import { stdin as input, stdout as output } from "node:process";

const password = await readPassword("New admin password: ");

if (password.length < 12) {
  console.error("Use a password with at least 12 characters.");
  process.exit(1);
}

const iterations = 210_000;
const salt = randomBytes(16).toString("base64url");
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("base64url");
const value = `pbkdf2$${iterations}$${salt}$${hash}`;
console.log(`Vercel / hosting dashboard:\n${value}`);
// Next.js expands $NAME inside .env files, so each $ must be escaped there.
console.log(`.env.local:\n${value.replaceAll("$", "\\$")}`);

function readPassword(prompt) {
  output.write(prompt);
  input.setRawMode(true);
  input.resume();
  input.setEncoding("utf8");

  return new Promise((resolve) => {
    let value = "";
    let complete = false;
    const onData = (chunk) => {
      for (const character of chunk) {
        if (complete) return;
        if (character === "\u0003") process.exit(130);
        if (character === "\r" || character === "\n") {
          complete = true;
          input.setRawMode(false);
          input.pause();
          input.removeListener("data", onData);
          output.write("\n");
          resolve(value);
        } else if (character === "\u007f" || character === "\b") {
          value = value.slice(0, -1);
        } else {
          value += character;
        }
      }
    };
    input.on("data", onData);
  });
}
