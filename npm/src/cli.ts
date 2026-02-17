#!/usr/bin/env node

const commands: Record<string, string> = {
  "dtutils help <command>": "Show help for a specific command",
  rgbtohex: "Convert RGB values to HEX color code",
  hextorgb: "Convert HEX color code to RGB values",
};

const args = process.argv.slice(2);

import figlet from "figlet";
import gradient from "gradient-string";

const text = figlet.textSync("DTUTILS", {
  font: "ANSI Shadow",
});

const myGradient = gradient([
  "#3588d5",
  "#6386dd",
  "#6f83da",
  "#8879d2",
  "#a670b1",
  "#b26ca4",
]);

if (args.length === 0) {
  console.log(myGradient.multiline(text));
  console.log("Run 'dtutils help'to see all commands.");
  process.exit(2);
}

const [cmd, arg] = args;

if (cmd === "help") {
  if (!arg) {
    // Just "help" -> list all commands
    console.log("Available commands:");
    for (const c in commands) {
      console.log(`  ${c}: ${commands[c]}`);
    }
    process.exit(0);
  } else if (commands[arg]) {
    // "help <command>" -> show command description
    console.log(`${arg}: ${commands[arg]}`);
    process.exit(0);
  } else {
    console.log("Unknown command. Run 'dtutils help' to see all commands.");
    process.exit(1); // unknown command
  }
} else if (commands[cmd]) {
  // Command exists, run it (success)
  console.log(`Running command: ${cmd}`);
  process.exit(0);
} else {
  // Unknown command
  console.log("Unknown command. Run 'dtutils help' to see all commands.");
  process.exit(1);
}
