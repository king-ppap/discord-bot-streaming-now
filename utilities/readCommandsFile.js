import fs from 'fs';
import path from 'path';
import Discord from 'discord.js';

function readCommandsFile(pathA) {
  const commands = new Discord.Collection();
  console.log('fs.__dirname', path.resolve());

  pathA = `${path.resolve()}/${pathA}`;
  fs.readdir(pathA, (err, files) => {
    if (err) console.log(err);

    // if (files.is)

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    console.log(files);
    if (jsfile.length <= 0) {
      console.log("Couldn't find commands.");
      process.exit(1);
    }

    jsfile.forEach(async (f, i) => {
      let props = await import(`${pathA}/${f}`);
      console.log(`${f} loaded!`);
      commands.set(props.default.help.name, props.default);
    });
  });
  return commands;
}

export default readCommandsFile;