import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_NAME, AUTH_SESSION_TTL_SECONDS } from "@/lib/constants";
import { createDemoUser } from "@/lib/demo-auth-store";
import { createSessionToken } from "@/lib/session";
import { registerSchema } from "@/modules/auth/validation";

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid registration data" }, { status: 400 });
  }

  const user = createDemoUser({
    name: parsed.data.name,
    email: parsed.data.email,
    password: parsed.data.password
  });
  if (!user) {
    return NextResponse.json({ message: "Email already exists" }, { status: 409 });
  }

  const token = await createSessionToken(
    { sub: user.id, name: user.name, email: user.email },
    AUTH_SESSION_TTL_SECONDS
  );
  const response = NextResponse.json({ user });

  response.cookies.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: AUTH_SESSION_TTL_SECONDS
  });

  return response;
}
