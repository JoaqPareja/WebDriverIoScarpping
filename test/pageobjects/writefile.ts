const fs = require('fs');

export function exportArrayToFile(array:Array<string>, filePath:string) {
  try {
    // Convert the array to a string
    const textData = array.join('\n');
    
    // Write the text data to the file
    fs.writeFileSync(filePath, textData);
    console.log(`Array exported to ${filePath}`);
  } catch (err:any) {
    console.error(`Error exporting array to ${filePath}: ${err.message}`);
  }
}
