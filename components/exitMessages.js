import chalk from 'chalk';
import boxen from 'boxen';
import cfonts from 'cfonts';
import os from 'os';
const osUserInfo = os.userInfo();
let systemUserName = osUserInfo?.username || 'World';

export const byeMessage = () => {
  console.log(
    boxen(chalk.white.bold('Bye...'), {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'green',
      backgroundColor: '#555555',
    }),
  );
};

export const noFilesFound = () =>
  console.log(
    boxen(`We can not find any document inside the directory`, {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'red',
      backgroundColor: '#555555',
    }),
  );

export const displayFilesCount = (fileCount) =>
  console.log(
    boxen(`We found ${chalk.white.bold(fileCount)} 📄`, {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'green',
      backgroundColor: '#555555',
    }),
  );

export const displaySuccessFileCount = (data) => {
  console.log(
    boxen(
      `${chalk.green.bold(`Success Files ${data.successFilesCount}`)}\n\n${chalk.red.bold(
        `Failed Files ${data.errorFilesCount}`,
      )}`,
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: data.successFilesCount ? 'green' : 'red',
        backgroundColor: '#555555',
      },
    ),
  );
};

export const greetingMessage = () => {
  return cfonts.say(`Hello ${systemUserName} !`, {
    font: 'block', // define the font face
    align: 'left', // define text alignment
    colors: ['system'], // define all colors
    background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1, // define letter spacing
    lineHeight: 1, // define the line height
    space: true, // define if the output text should have empty lines on top and on the bottom
    maxLength: '0', // define how many character can be on one line
    gradient: false, // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false, // define if this is a transition between colors directly
    env: 'node', // define the environment cfonts is being executed in
  });
};
