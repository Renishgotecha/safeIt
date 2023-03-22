import {
  byeMessage,
  displayFilesCount,
  displaySuccessFileCount,
  greetingMessage,
  noFilesFound,
} from './exitMessages.js';
import {
  askForPath,
  askForPasswordAndConfirmPassword,
  askForPassword,
  askForEncryptOrDecrypt,
} from './userAsks.js';
import { createDecryptedFiles, createEncryptedFiles, getFilesFromDir } from './utils.js';

export const encryptFilesFromDir = async () => {
  try {
    // Ask for Path For Get Files
    const inputFilePath = await askForPath(
      'Enter path from which you want to create encryption of files ... ',
    );
    if (!inputFilePath.status) {
      throw 'Manual Exit After Wrong Input Path';
    }
    // Check how many files are available in the directory
    const allFiles = getFilesFromDir(inputFilePath.path);

    // if we can not find any files
    if (!allFiles.length) {
      return noFilesFound();
    }
    // Display Total File Counts
    displayFilesCount(allFiles.length);

    // As For Path For Put the files
    const encryptFilesPath = await askForPath(
      'Enter path from which you want to put encrypted files ... ',
    );
    if (!encryptFilesPath.status) {
      throw 'Manual Exit After Wrong Encrypt Path';
    }

    // Ask For Password
    const askForPasswordAndConfirmPasswordValue = await askForPasswordAndConfirmPassword();
    if (!askForPasswordAndConfirmPasswordValue.status) {
      throw 'Manual Exit After  Path';
    }

    // Create Encrypted Files and put to respective folder
    const dataResult = await createEncryptedFiles(
      allFiles,
      inputFilePath.path,
      encryptFilesPath.path,
      askForPasswordAndConfirmPasswordValue.password,
    );

    displaySuccessFileCount(dataResult.data);
  } catch (error) {
    // console.error("🚀 ~ file: mainFlow.js:24 ~ encryptFilesFromDir ~ error:", error)
    return byeMessage();
  }
};

export const decryptFilesFromDir = async () => {
  // Ask for Path For Get Files
  const inputFilePath = await askForPath(
    'Enter path from which you want to read encrypted files ... ',
  );
  if (!inputFilePath.status) {
    throw 'Manual Exit After Wrong Input Path';
  }
  // Check how many files are available in the directory
  const allFiles = getFilesFromDir(inputFilePath.path);

  // if we can not find any files
  if (!allFiles.length) {
    return noFilesFound();
  }
  // Display Total File Counts
  displayFilesCount(allFiles.length);

  // As For Path For Put the files
  const decryptedFilesPath = await askForPath(
    'Enter path from which you want to put decrypted files ... ',
  );
  if (!decryptedFilesPath.status) {
    throw 'Manual Exit After Wrong Encrypt Path';
  }

  // Ask For Password
  const askForPasswordValue = await askForPassword();
  if (!askForPasswordValue.status) {
    throw 'Manual Exit After Wrong Path';
  }

  // Create Encrypted Files and put to respective folder
  const dataResult = await createDecryptedFiles(
    allFiles,
    inputFilePath.path,
    decryptedFilesPath.path,
    askForPasswordValue.password,
  );

  displaySuccessFileCount(dataResult.data);
};

export const startProject = async () => {
  try {
    greetingMessage();
    // Ask user to encrypt or decrypt
    const responseOfEncryptOrDecrypt = await askForEncryptOrDecrypt();

    // If user wants to exit
    if (!responseOfEncryptOrDecrypt.value || responseOfEncryptOrDecrypt.value === 'quit') {
      throw 'Manual Exit';
    }

    // if user wants to encrypt files then ask for the path
    if (responseOfEncryptOrDecrypt.value === 'encrypt') {
      encryptFilesFromDir();
    }

    if (responseOfEncryptOrDecrypt.value === 'decrypt') {
      decryptFilesFromDir();
    }
  } catch (error) {
    // console.log("🚀 ~ file: main.js:75 ~ error:", error)
    return byeMessage();
  }
};
