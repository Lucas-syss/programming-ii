//regular check on inputs if invalid dont process information to output

// age check 
//if (isNan(number)) {
  // dont accept row
//} return //accept

//name check
//if (!typeof values[0] === "string") {
  
//} return

//email check
//if (^[^\s@]+@[^\s@]+\.[^\s@]+$)


const fs = require('node:fs');
var path = require("path");

if (fs.existsSync(path.resolve(path.resolve(__dirname, 'input.csv')))) {
  console.log('The path exists.');

  const csvData = fs.readFileSync('input.csv', 'utf-8');
  try {
    const rows = csvData.split('\n');
    const headers = rows[0].split(','); // ["name", "email", "age"]
    const data = rows.slice(1).map(row => {
      const values = row.split(',');
      return {
        name: values[0],
        email: values[1],
        age: parseInt(values[2])
      };
    });
    fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
}
else {
  console.log('File does not exist.');
}