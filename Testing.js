require('shell');
require('coffeescript/register');
require('./node_modules/hubot/bin/hubot');

const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const startHubot = (script) => {
  console.log(`Starting Hubot with ${script}...`);

  exec(`npx hubot --adapter shell`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting Hubot: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    console.log(stdout);
  });
};

const selectRepresentative = () => {
  console.log('Select your customer service representative:');
  console.log('1. Carlos (Male Hispanic)');
  console.log('2. Ingrid (Female Swedish)');
  console.log('3. Indy (Indiana Jones-style)');

  rl.question('Enter the number of your choice: ', (answer) => {
    switch (answer) {
      case '1':
        process.env.HUBOT_SCRIPTS = './scripts/male-hispanic-rep.js';
        startHubot('Carlos');
        break;
      case '2':
        process.env.HUBOT_SCRIPTS = './scripts/female-swedish-rep.js';
        startHubot('Ingrid');
        break;
      case '3':
        process.env.HUBOT_SCRIPTS = './scripts/indiana-jones-rep.js';
        startHubot('Indy');
        break;
      default:
        console.log('Invalid choice. Exiting.');
        rl.close();
    }
  });
};

selectRepresentative();
