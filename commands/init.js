'use strict';

const ora = require('ora');
const Init = require('../classes/init');
const { logger } = require('../utils');

exports.command = 'init';

exports.aliases = ['i'];

exports.describe = `Create a new assets.json file in the current working directory`;

exports.builder = yargs => {
    yargs.options({
        server: {
            alias: 's',
            describe: 'Specify location of asset server.',
            default: '',
        },
        cwd: {
            alias: 'c',
            describe: 'Alter current working directory.',
            default: process.cwd(),
        },
        org: {
            alias: 'o',
            describe: 'Specify the organisation context for the command.',
            default: '',
        },
        name: {
            alias: 'n',
            describe: 'Specify the app name context for the command.',
            default: '',
        },
        version: {
            alias: 'v',
            describe: 'Specify the app version context for the command.',
            default: '1.0.0',
        },
        js: {
            describe:
                'Specify the path on local disk to JavaScript client side assets relative to the current working directory.',
            default: '',
        },
        css: {
            describe:
                'Specify the path on local disk to CSS client side assets relative to the current working directory.',
            default: '',
        },
        debug: {
            describe: 'Logs additional messages',
            default: false,
            type: 'boolean',
        },
    });
};

exports.handler = async argv => {
    const spinner = ora().start('working...');
    let success = false;
    const { debug } = argv;

    try {
        success = await new Init({
            logger: logger(spinner, debug),
            ...argv,
        }).run();
    } catch (err) {
        logger.warn(err.message);
    }

    if (success) {
        spinner.text = '';
        spinner.stopAndPersist();
    } else {
        spinner.text = '';
        spinner.stopAndPersist();
        process.exit(1);
    }
};