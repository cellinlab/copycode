# 🚀 Copy Code as Markdown

**Copy Code as Markdown** is a VS Code extension that lets you quickly copy the content of a file or folder as a Markdown-formatted snippet directly to your clipboard. Perfect for documentation, code sharing, and saving project notes in Markdown!

## ✨ Features

- 📄 **Copy File Content**: Right-click any file and select **Copy as Markdown** to copy its file path and content, formatted with the appropriate code block language for Markdown.
- 📂 **Copy Folder Content**: Right-click any folder to copy all files within, recursively gathering file paths and contents into a single Markdown-formatted snippet. If the total content size exceeds 10 MB, the extension will notify you, and only part of the content will be copied.
- 🌈 **Automatic Language Detection**: The extension detects file types to set the appropriate syntax highlighting in Markdown code blocks.

## 🛠️ Usage

1. **Install the Extension**: Search for "Copy Code as Markdown" in the VS Code Extensions Marketplace and install it.
2. **Copy File or Folder**:

   - Right-click on any file in the Explorer panel and choose **Copy as Markdown** to copy that file's content.
   - Right-click on any folder to recursively copy all files within as Markdown.

3. **Paste the Markdown**: Once copied, paste the Markdown content wherever needed.

## 📥 Installation

You can install this extension directly from the VS Code Marketplace by searching for "Copy Code as Markdown" or by visiting the [VS Code Extension Marketplace](https://marketplace.visualstudio.com/vscode).

## 📜 Extension Commands

This extension contributes the following command:

- `extension.copyCodeAsMD`: Copies the selected file or folder content as Markdown.

## 👩‍💻 Development

To work on this extension:

1. Clone the repository and open it in VS Code.
2. Run `npm install` to install dependencies.
3. Press `F5` to open a new VS Code window with the extension loaded.

## 📄 License

This extension is available under the MIT License.
