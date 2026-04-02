import type { User } from "@/types/user";

interface DemoUserRecord extends User {
  password: string;
}

const demoUsers = new Map<string, DemoUserRecord>();

const seedUser: DemoUserRecord = {
  id: "u_demo_admin",
  name: "Demo Admin",
  email: "admin@example.com",
  password: "secret123"
};

demoUsers.set(seedUser.email.toLowerCase(), seedUser);

export function findDemoUserByEmail(email: string): DemoUserRecord | null {
  return demoUsers.get(email.toLowerCase()) ?? null;
}

export function createDemoUser(input: {
  name: string;
  email: string;
  password: string;
}): User | null {
  const normalizedEmail = input.email.toLowerCase();

  if (demoUsers.has(normalizedEmail)) {
    return null;
  }

  const nextUser: DemoUserRecord = {
    id: `u_${crypto.randomUUID()}`,
    name: input.name,
    email: normalizedEmail,
    password: input.password
  };
  demoUsers.set(normalizedEmail, nextUser);

  return {
    id: nextUser.id,
    name: nextUser.name,
    email: nextUser.email
  };
}

export function verifyDemoUserCredentials(email: string, password: string): User | null {
  const record = findDemoUserByEmail(email);
  if (!record || record.password !== password) {
    return null;
  }

  return {
    id: record.id,
    name: record.name,
    email: record.email
  };
}
