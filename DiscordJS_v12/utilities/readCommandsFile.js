import fs from 'fs';
import path from 'path';

function readCommandsFile(pathA) {
  const commands = [];

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
      command = props.default
      console.log(`${f} loaded!`);
      commands.push(command);
    });
    return commands;
  });
}

export default readCommandsFile;