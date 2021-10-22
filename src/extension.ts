// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { FS } from './fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const fs = new FS();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "create-multi-fs" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let fileCommand = vscode.commands.registerCommand('create-multi-fs.file', async () => {
		let result = await vscode.window.showInputBox();
		if (result) {
			let files = result.trim().split(' ');

			for (let file of files) {
				await fs.createFile(file);
			}

		} else {
			vscode.window.showErrorMessage('No file provided');
		}
	});

	let folderCommand = vscode.commands.registerCommand('create-multi-fs.folder', async () => {
		let result = await vscode.window.showInputBox();
		if (result) {
			let folders = result.trim().split(' ');

			for (let folder of folders) {
				await fs.createFolder(folder);
			}

		} else {
			vscode.window.showErrorMessage('No folder provided');
		}
	});

	context.subscriptions.push(fileCommand, folderCommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }
