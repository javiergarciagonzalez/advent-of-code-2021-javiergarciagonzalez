const { getDataFromTxtFile } = require('./dataGetter.js');
const { getResult } = require('./utils.js');

(async () => {
  const data = await getDataFromTxtFile();

  console.log('Result: ', getResult(data));
})();
