#! /usr/bin/env node

import { program } from 'commander';
import { decryptFilesFromDir, encryptFilesFromDir, startProject } from '../components/mainFlow.js';

program.version('1.0.0');

// Commands
program
  .command('start', { isDefault: true })
  .description('Start Encryption and Description')
  .alias('s')
  .action(function () {
    startProject();
  });

program
  .command('encrypt')
  .description('For encrypt files from specific directory')
  .alias('e')
  .action(function () {
    encryptFilesFromDir();
  });

program
  .command('decrypt')
  .description('For decrypt files from specific directory')
  .alias('d')
  .action(function () {
    decryptFilesFromDir();
  });

program.parse(process.argv);
