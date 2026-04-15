import { spawn } from "node:child_process";

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: false
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} failed with code ${code}`));
    });
  });
}

async function main() {
  await run("node", ["scripts/use-profile.mjs", "starter"]);
  await run("node", ["scripts/seed-demo.mjs"]);

  console.log("Setup complete.");
  console.log("- Generated .env/.env.local from .env.example when missing");
  console.log("- Starter profile enabled (Mongo + REST + custom auth + demo data)");
  console.log("- Demo credentials: admin@example.com / secret123");
  console.log("- Next step: pnpm dev");
}

main().catch((error) => {
  console.error(`setup failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  process.exit(1);
});
