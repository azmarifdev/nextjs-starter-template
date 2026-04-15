// @vitest-environment node

import { describe, expect, it } from "vitest";

describe("app boot smoke", () => {
  it("loads root layout and dashboard pages", async () => {
    const layout = await import("@/app/layout");
    const dashboard = await import("@/app/(dashboard)/dashboard/page");
    const projects = await import("@/app/(dashboard)/projects/page");

    expect(typeof layout.default).toBe("function");
    expect(typeof dashboard.default).toBe("function");
    expect(typeof projects.default).toBe("function");
  });
});
