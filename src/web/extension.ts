import * as vscode from "vscode";
import { JWTEditor } from "./panels/JWTEditor";
import jwt_decode from "jwt-decode";
import {
  decodeHeader,
  decodePayload,
  isJsonString,
} from "../utilities/jwtDecode";
import { PreviewWebview } from "./panels/PreviewWebview";

export function activate(context: vscode.ExtensionContext) {
  // Decode the selected Token
  context.subscriptions.push(
    vscode.commands.registerCommand("jwt.jwtDecode", () => {
      const editor = vscode.window.activeTextEditor;
      if (editor == undefined) {
        return;
      }

      let selectedText: any = editor.selections;
      if (selectedText.length > 1) {
        vscode.window.showErrorMessage(
          "[JWTDebugger] Sorry, multiple text is not supported!"
        );
        return;
      }

      let token: string = editor.document.getText(
        new vscode.Range(selectedText[0].start, selectedText[0].end)
      );
      if (token.length < 1) {
        vscode.window.showErrorMessage("Select the text to decode!");
        return;
      }

      try {
        const decodedHeader = decodeHeader(token);
        const decodedPayload = decodePayload(token);
        const panel = vscode.window.createWebviewPanel(
          "previewJWT",
          "Preview JWT",
          vscode.ViewColumn.Two,
          {}
        );

        panel.webview.html = PreviewWebview.getJWTDecodeWebView(
          token,
          decodedHeader,
          decodedPayload
        );
      } catch (e: any) {
        if (e.name === "InvalidTokenError") {
          vscode.window.showErrorMessage("Invalid Token Error!");
        }
      }
    })
  );

  // Encode the selected Token
  context.subscriptions.push(
    vscode.commands.registerCommand("jwt.jwtEncode", () => {
      const editor = vscode.window.activeTextEditor;
      if (editor == undefined) {
        return;
      }

      let selectedText: any = editor.selections;
      if (!isJsonString(selectedText)) {
        vscode.window.showErrorMessage("[JWT] Sorry, Invalid JSON Token");
        return;
      }
    })
  );

  // Open a JWT editor to decode, encode and generate JWT
  context.subscriptions.push(
    vscode.commands.registerCommand("jwt.editor", () => {
      JWTEditor.render(context.extensionUri);
    })
  );
}

export function deactivate() {}
