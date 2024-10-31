// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "copycode" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.copyCodeAsMD', async function (uri) {
		try {
			const isDir = fs.statSync(uri.fsPath).isDirectory();

			if (isDir) {
				await handleFolder(uri);
			} else {
				await handleFile(uri);
			}

			vscode.window.showInformationMessage('Code copied to clipboard');
		} catch (error) {
			vscode.window.showErrorMessage('Error copying code');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

async function handleFile(uri) {
	const filePath = vscode.workspace.asRelativePath(uri.fsPath);
	const document = await vscode.workspace.openTextDocument(uri);
	const fileContent = document.getText();

	const fileType = document.languageId;
	const mdContent = `File Path: ${filePath}\nFile Content:\n\`\`\`${fileType}\n${fileContent}\n\`\`\`\n`;

	await vscode.env.clipboard.writeText(mdContent);
}

async function handleFolder(uri) {
	let mdContent = '';
	let totalSize = 0;

	function readFolder(folderPath) {
		const files = fs.readdirSync(folderPath);

		for (const file of files) {
			const filePath = path.join(folderPath, file);
			const fileStat = fs.statSync(filePath);

			if (fileStat.isDirectory()) {
				readFolder(filePath);
			} else {
				const relativePath = vscode.workspace.asRelativePath(filePath);
				const fileType = path.extname(filePath).slice(1);
				const fileContent = fs.readFileSync(filePath, 'utf8');

				if (totalSize + fileContent.length > MAX_TOTAL_SIZE) {
					vscode.window.showErrorMessage('Total size of files exceeds 10MB');
					return;
				}

				const fileMdContent = `File Path: ${relativePath}\nFile Content:\n\`\`\`${fileType}\n${fileContent}\n\`\`\`\n`;
				mdContent += fileMdContent;
				totalSize += fileContent.length;
			}
		}
	}

	readFolder(uri.fsPath);
	await vscode.env.clipboard.writeText(mdContent);
}

module.exports = {
	activate,
	deactivate
}
