import { readFileSync } from "node:fs";
import { stdin as input, stdout as output } from "node:process";

const account = process.argv[2]?.toLowerCase();
const variableName = account === "ioannis" ? "ADMIN_IOANNIS_PASSWORD_HASH" : account === "stylianos" ? "ADMIN_STYLIANOS_PASSWORD_HASH" : null;

if (!variableName) {
  console.error("Usage: npm run admin:verify-password -- ioannis|stylianos");
  process.exit(1);
}

const stored = readEnvironmentVariable(variableName);
if (!stored) {
  console.error(`No ${variableName} is configured in .env.local.`);
  process.exit(1);
}

const password = await readPassword(`Password for ${account}: `);
const [algorithm, iterationsText, salt, expected] = stored.split("$");
const iterations = Number(iterationsText);
const derived = algorithm === "pbkdf2" && Number.isSafeInteger(iterations) && salt && expected
  ? new Uint8Array(await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: new TextEncoder().encode(salt), iterations },
    await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]),
    256,
  ))
  : null;
const matches = Boolean(derived && expected && base64UrlEncode(derived) === expected);

console.log(matches ? "Password matches the configured account." : "Password does not match the configured account.");
process.exit(matches ? 0 : 1);

function readEnvironmentVariable(name) {
  const line = readFileSync(".env.local", "utf8").split(/\r?\n/).find((value) => value.startsWith(`${name}=`));
  return line?.slice(name.length + 1).trim().replaceAll("\\$", "$") ?? "";
}

function base64UrlEncode(value) {
  let text = "";
  value.forEach((byte) => { text += String.fromCharCode(byte); });
  return btoa(text).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

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
