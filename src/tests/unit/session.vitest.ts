import { describe, expect, it } from "vitest";

import { createSessionToken, verifySessionToken } from "@/lib/session";

describe("session token", () => {
  it("creates and verifies a valid token", async () => {
    const token = await createSessionToken(
      { sub: "u_1", name: "Demo User", email: "demo@example.com" },
      60
    );

    const payload = await verifySessionToken(token);
    expect(payload).not.toBeNull();
    expect(payload?.sub).toBe("u_1");
    expect(payload?.email).toBe("demo@example.com");
  });

  it("rejects a tampered token", async () => {
    const token = await createSessionToken(
      { sub: "u_2", name: "Another", email: "another@example.com" },
      60
    );
    const [encoded, signature] = token.split(".");
    const tamperedToken = `${encoded}.tampered${signature}`;

    const payload = await verifySessionToken(tamperedToken);
    expect(payload).toBeNull();
  });
});
