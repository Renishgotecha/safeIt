import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const getFilesFromDir = (dir) => {
  return fs.readdirSync(dir);
};

function generateKey(str) {
  return crypto.createHash('sha256').update(str).digest();
}

/**
 *
 * @param {original filePath} inputFile
 * @param {encrypt image filePath} encryptedFile
 * @param {encryption key} encryptionKey
 * @returns
 */
export const encryptFile = (inputFile, encryptedFile, encryptionKey) => {
  try {
    // Read the input file
    const input = fs.readFileSync(inputFile);

    // Create a Cipher object with AES-256-CBC algorithm and a random IV
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);

    // Encrypt the input file
    const encrypted = Buffer.concat([cipher.update(input), cipher.final()]);

    // Write the encrypted file
    fs.writeFileSync(encryptedFile, Buffer.concat([iv, encrypted]));
    return true;
  } catch (error) {
    return false;
  }
};

/**
 *
 * @param {encrypt image filePath} encryptedFile
 * @param {decrypt image filePath} decryptedFile
 * @param {encryption key} encryptionKey
 * @returns
 */
export const decryptFile = (encryptedFile, decryptedFile, encryptionKey) => {
  try {
    // Read the encrypted file
    const data = fs.readFileSync(encryptedFile);

    // Get the IV from the encrypted data
    const encryptedIV = data.slice(0, 16);

    // Create a Decipher object with AES-256-CBC algorithm and the same IV
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, encryptedIV);

    // Decrypt the encrypted file
    const decrypted = Buffer.concat([decipher.update(data.slice(16)), decipher.final()]);

    // Write the decrypted file
    fs.writeFileSync(decryptedFile, decrypted);

    return true;
  } catch (error) {
    return false;
  }
};

export const createDecryptedFiles = (documents, encryptFilesPath, decryptFilesPath, password) => {
  let successFilesCount = 0;
  let errorFilesCount = 0;
  const key = generateKey(password);

  for (const document of documents) {
    const isDone = decryptFile(
      path.join(encryptFilesPath, document),
      path.join(decryptFilesPath, document),
      key,
    );
    if (isDone) {
      successFilesCount++;
    } else {
      errorFilesCount++;
    }
  }

  return {
    status: true,
    data: {
      successFilesCount,
      errorFilesCount,
    },
  };
};

export const createEncryptedFiles = (documents, inputFilePath, encryptFilesPath, password) => {
  let successFilesCount = 0;
  let errorFilesCount = 0;
  const key = generateKey(password);
  for (const document of documents) {
    const isDone = encryptFile(
      path.join(inputFilePath, document),
      path.join(encryptFilesPath, document),
      key,
    );
    if (isDone) {
      successFilesCount++;
    } else {
      errorFilesCount++;
    }
  }
  return {
    status: true,
    data: {
      successFilesCount,
      errorFilesCount,
    },
  };
};

export const removeSingleQuotes = (str) => {
  if (str.charAt(0) === "'" && str.charAt(str.length - 1) === "'") {
    return str.slice(1, -1);
  }
  return str;
};
