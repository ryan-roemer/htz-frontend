import fs from 'fs';
import path from 'path';

const loadGQLFile = pathToFile => {
  /* TODO: The second argument ('../../../src') is only because the
   .graphql files wont compile into the dist folder, so it moves back
   up to the original file. */
  const filePath = path.join(__dirname, '../../../src', pathToFile);
  return fs.readFileSync(filePath, 'utf-8');
};

export default loadGQLFile;
