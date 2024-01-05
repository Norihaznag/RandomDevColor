import * as vscode from 'vsce';

function activate(context: vscode.ExtensionContext) {
  console.log('Random Color Extension is now active!');

  let disposable = vscode.commands.registerCommand('extension.addRandomColors', () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const document = editor.document;
      const text = document.getText();
      const updatedText = addRandomColors(text);
      editor.edit(editBuilder => {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(document.lineCount + 1, 0);
        editBuilder.replace(new vscode.Range(start, end), updatedText);
      });
    }
  });

  context.subscriptions.push(disposable);
}

function addRandomColors(text: string): string {
  // Regex to match React div elements
  const divRegex = /<div(.*?)<\/div>/gs;

  return text.replace(divRegex, match => {
    // Add a random background color to the style attribute
    const randomColor = getRandomColor();
    return `<div style={{ backgroundColor: "${randomColor}" }}${match.substring(5)}`;
  });
}

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// this method is called when your extension is deactivated
function deactivate() {}

export = {
  activate,
  deactivate
};
