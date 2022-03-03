import * as vscode from "vscode";
import jwt_decode from "jwt-decode";

export function decodeHeader(token: any): any {
  try {
    if (token != undefined) {
      return jwt_decode(token, { header: true });
    }
  } catch (e: any) {
    if (e.name === "InvalidTokenError") {
      return e;
    }
  }
}

export function decodePayload(token: any): any {
  try {
    if (token != undefined) {
      return jwt_decode(token);
    }
  } catch (e: any) {
    if (e.name === "InvalidTokenError") {
      return e;
    }
  }
}

export function isJsonString(str: any): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
