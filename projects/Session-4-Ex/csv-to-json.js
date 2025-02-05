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

      
      if (values.length < 3) {
        return null; 
      }

      const name = values[0].trim();
      const email = values[1].trim();
      const age = parseInt(values[2].trim());

      if (isNaN(age) || age <= 0) {
        return null; 
      }

      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(name)) {
        return null; 
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        return null; 
      }

      return {
        name: name,
        email: email,
        age: age
      };
    }).filter(row => row !== null); 

    fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  }
} else {
  console.log('File does not exist.');
}