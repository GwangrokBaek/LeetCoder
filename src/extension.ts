import * as vscode from "vscode";
import { AccountManager } from "./component";

export let submitStatusBar: vscode.StatusBarItem;
let userInfo: boolean = false;

export function activate(context: vscode.ExtensionContext) {
  const account = new AccountManager();

  vscode.commands.executeCommand("setContext", "leetcoder.userInfo", false);

  let submit = vscode.commands.registerCommand("leetcoder.submit", () => {
    vscode.window.showInformationMessage("Submit!!");
  });

  let signIn = vscode.commands.registerCommand("leetcoder.signIn", () =>
    account.handleSignIn()
  );
  let logout = vscode.commands.registerCommand(
    "leetcoder.signOut",
    () => account.handleSignOut("Leetcode") // TODO
  );

  submitStatusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    1
  );

  submitStatusBar.text = "Sign out";
  submitStatusBar.command = "leetcoder.signOut";
  context.subscriptions.push(submitStatusBar);

  context.subscriptions.push(submit);
  context.subscriptions.push(signIn);
  context.subscriptions.push(logout);
}

export function deactivate() {}
