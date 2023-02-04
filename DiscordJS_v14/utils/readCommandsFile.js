import fs from 'fs/promises';
import path from 'path';

async function readCommandsFile(pathA) {
  const commands = [];

  pathA = `${path.resolve()}/${pathA}`;

  const files = await fs.readdir(pathA)
    .catch(err => {
      console.error(err);
    });

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  console.log('readdir', files);
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    process.exit(1);
  }

  for (const f of jsfile) {
    let props = await import(`${pathA}/${f}`);
    console.log(`File: "${f}" Command: "${props.default.data.name}"`);
    commands.push(props.default);
  }

  console.log('readCommandsFile', commands);
  return commands;
}

export default readCommandsFile;