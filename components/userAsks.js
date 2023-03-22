import prompts from 'prompts';
import fs from 'fs';
import { removeSingleQuotes } from './utils.js';

export const askForEncryptOrDecrypt = async () => {
  return prompts({
    type: 'select',
    name: 'value',
    message: 'Choose do you want to do....',
    choices: [
      {
        title: '🔒 Encrypt Files',
        description: 'This option use to encrypt files from specific directory',
        value: 'encrypt',
      },
      {
        title: '🔑 Decrypt Files',
        description: 'This option use to decrypt files from specific directory',
        value: 'decrypt',
      },
      {
        title: '🏃 Quit',
        value: 'quit',
      },
    ],
    initial: 0,
  });
};

export const askForPath = async (message) => {
  const pathValue = await prompts({
    type: 'text',
    name: 'value',
    message: message || 'Please Enter path ... ',
  });
  pathValue.value = removeSingleQuotes(pathValue.value);

  if (fs.existsSync(pathValue.value)) {
    // Do something
    return {
      status: true,
      path: pathValue.value,
    };
  } else {
    const unableToGetPath = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'We are unable to get the path do you want to continue to enter new path ?',
      initial: true,
    });

    if (unableToGetPath.value) {
      return askForPath();
    } else {
      return {
        status: false,
      };
    }
  }
};

export const askForText = async (message) => {
  return prompts({
    type: 'text',
    name: 'value',
    message: message || 'Enter a text',
  });
};

export const askForPassword = async (message) => {
  try {
    const passwordValue = await prompts({
      type: 'password',
      name: 'value',
      message: message || 'Enter your password',
      validate: (value) =>
        !value || '' || value.length < 3
          ? `Your password is not valid it should more then 2 letters`
          : true,
    });
    return {
      status: true,
      password: passwordValue.value,
    };
  } catch (error) {
    return {
      status: false,
    };
  }
};

export const askForPasswordAndConfirmPassword = async () => {
  const askForPasswordValue = await askForPassword(
    'Please enter password to encrypt the files ... ',
  );
  const askForConfirmPassword = await askForPassword(
    'Please enter same password one more time ... ',
  );

  if (askForPasswordValue.password == askForConfirmPassword.password) {
    return {
      status: true,
      password: askForPasswordValue.password,
    };
  } else {
    const passwordMisMatch = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Your password and confirm password are not same do you want to enter it again ? ',
      initial: true,
    });

    if (passwordMisMatch.value) {
      return askForPasswordAndConfirmPassword();
    } else {
      return {
        status: false,
      };
    }
  }
};
