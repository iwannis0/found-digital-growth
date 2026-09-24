import { initBotId } from "botid/client/core";

// Must list the same endpoints the server checks with checkBotId().
initBotId({
  protect: [
    { path: "/api/contact", method: "POST" },
    { path: "/api/audit", method: "POST" },
    { path: "/api/newsletter", method: "POST" },
  ],
});
