import { getProjectRoot } from "./setup-shared.mjs";
import { applyProfile, profileConfig } from "./profile-config.mjs";

const rootDir = getProjectRoot(import.meta.url);
const profileName = process.argv[2] ?? "starter";

applyProfile(rootDir, profileName)
  .then((result) => {
    console.log(`Profile applied: ${result.profileName}`);
    console.log(`- Updated file: ${result.envLocalPath}`);
    console.log(`- Updated keys: ${result.keys.join(", ")}`);
  })
  .catch((error) => {
    const valid = Object.keys(profileConfig).join(", ");
    console.error(`use:profile failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    console.error(`Valid profiles: ${valid}`);
    process.exit(1);
  });
