const vscode = acquireVsCodeApi();

window.addEventListener("load", main);

function main() {
  const encodeButton = document.getElementById("encode");
  encodeButton.addEventListener("click", encodeJWT);
}

function encodeJWT() {
  vscode.postMessage({
    command: "encode",
    text: "Hey there partner! 🤠",
  });
}