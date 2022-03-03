import * as vscode from "vscode";
import AccountManager from "./accountManager";

let submitStatusBar: vscode.StatusBarItem;
let userInfo: boolean = false;

export function activate(context: vscode.ExtensionContext) {
  const account = new AccountManager();

  vscode.commands.executeCommand("setContext", "leetup.userInfo", false);

  let submit = vscode.commands.registerCommand("leetup.submit", () => {
    vscode.window.showInformationMessage("Submit!!");
  });

  let signIn = vscode.commands.registerCommand("leetup.SignIn", () =>
    account.handleSignIn()
  );

  let logout = vscode.commands.registerCommand("leetup.logout", () => {
    vscode.window.showInformationMessage("Logout!!");
    vscode.commands.executeCommand("setContext", "leetup.userInfo", false);
    submitStatusBar.hide();
    userInfo = false;
  });

  submitStatusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1
  );

  submitStatusBar.text = "LeetUp Submit";
  submitStatusBar.command = "leetup.submit";
  context.subscriptions.push(submitStatusBar);

  if (userInfo) {
    submitStatusBar.show();
  }

  context.subscriptions.push(submit);
  context.subscriptions.push(signIn);
  context.subscriptions.push(logout);
}

export function deactivate() {}
