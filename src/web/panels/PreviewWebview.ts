// Preview panels
export class PreviewWebview {
  public static getJWTDecodeWebView(token: string, header: any, payload: any) {
    let h = JSON.stringify(header, null, 4);
    let p = JSON.stringify(payload, null, 4);
    let jwt: string[] = token.split(".", 3);

    return /*html*/ `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';">
            <title>JWT Debugger - Decoded</title>
          </head>
          <body>
            <h1>Decoded</h1>
            <h2>Your Token</h2>
            <div class="encodedString" style="word-wrap: break-word;">
            <span style="color:#fb015b;font-weight:bold">${jwt[0]}</span><span style="color:black;font-weight:bold">.</span><span style="color:#d63aff;font-weight:bold">${jwt[1]}</span><span style="color:black;font-weight:bold">.</span><span style="color:#00b9f1;font-weight:bold">${jwt[2]}</span>
            </div>
            <h2>HEADER</h2>
            <pre style="color:#fb015b;font-weight: bold;">${h}</pre>
            <h2>PAYLOAD</h2>
            <pre style="color:#d63aff;font-weight: bold;">${p}</pre>
          </body>
          </html>`;
  }

  public static getJWTEncodeWebView(token: string, encodedToken: any) {
    let jwt: string = encodedToken.split(".", 3)[0];
    return /*html*/ `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline';">
            <title>JWT Debugger - Decoded</title>
          </head>
          <body>
            <h1>Encoded</h1>
            <h2>Your Token</h2>
            <pre style="color:#fb015b;font-weight: bold;">${token}</pre>
            <h2>PAYLOAD</h2>
            <div class="encodedString" style="word-wrap: break-word;">
            <span style="color:#fb015b;font-weight:bold">${jwt[0]}</span><span style="color:black;font-weight:bold">.</span><span style="color:#d63aff;font-weight:bold">${jwt[1]}</span><span style="color:black;font-weight:bold">.</span><span style="color:#00b9f1;font-weight:bold">${jwt[2]}</span>
            </div>
          </body>
          </html>`;
  }
}
