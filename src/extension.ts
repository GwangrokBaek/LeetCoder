import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "leetup" is now active!');
  vscode.commands.executeCommand("setContext", "leetup.userInfo", false);

  let submit = vscode.commands.registerCommand("leetup.submit", () => {
    vscode.window.showInformationMessage("Submit!!");
  });

  let login = vscode.commands.registerCommand("leetup.login", () => {
    vscode.window.showInformationMessage("Login!!");
    vscode.commands.executeCommand("setContext", "leetup.userInfo", true);
  });

  let logout = vscode.commands.registerCommand("leetup.logout", () => {
    vscode.window.showInformationMessage("Logout!!");
    vscode.commands.executeCommand("setContext", "leetup.userInfo", false);
  });

  context.subscriptions.push(submit);
  context.subscriptions.push(login);
  context.subscriptions.push(logout);
}

export function deactivate() {}
