
const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('c:\\Users\\Benikam Srikar\\portfolio-16\\Benikam_Srikar_Resume.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    console.error(err);
});
