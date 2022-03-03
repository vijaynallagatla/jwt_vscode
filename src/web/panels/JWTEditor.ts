import * as vscode from "vscode";
import { getUri } from "../../utilities/getUri";

export class JWTEditor {
  public static currentPanel: JWTEditor | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel;
    this._panel.webview.html = this._getWebviewContent(
      this._panel.webview,
      extensionUri
    );
    this._setWebviewMessageListener(this._panel.webview);
    this._panel.onDidDispose(this.dispose, null, this._disposables);
  }

  public static render(extensionUri: vscode.Uri) {
    if (JWTEditor.currentPanel) {
      JWTEditor.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel(
        "editor",
        "JWT Editor",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      JWTEditor.currentPanel = new JWTEditor(panel, extensionUri);
    }
  }

  private _getWebviewContent(
    webview: vscode.Webview,
    extensionUri: vscode.Uri
  ) {
    const toolkitUri = getUri(webview, extensionUri, [
      "node_modules",
      "@vscode",
      "webview-ui-toolkit",
      "dist",
      "toolkit.js",
    ]);

    const mainUri = getUri(webview, extensionUri, ["media", "main.js"]);

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script type="module" src="${toolkitUri}"></script>
          <script type="module" src="${mainUri}"></script>
          <title>JWT Editor</title>
        </head>
        <body>
          <h1>JWT</h1>
          <h3>JWT Editor allows you to decode, verify and generate JWT. </h3>
          <vscode-button id="decode">Decode</vscode-button>
          <vscode-button id="encode">Encode</vscode-button>
        </body>
      </html>
    `;
  }

  private _setWebviewMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;

        switch (command) {
          case "encode":
            vscode.window.showInformationMessage(text);
            return;
        }
      },
      undefined,
      this._disposables
    );
  }

  public dispose() {
    JWTEditor.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
