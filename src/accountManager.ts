import * as vscode from "vscode";

interface SingInMenuProps extends vscode.QuickPickItem {
  value: string;
}
class AccountManager {
  constructor() {}

  private singInMenu: SingInMenuProps[] = [
    {
      label: "LeetCode account",
      detail: "Sign in with using LeetCode account",
      value: "Leetcode",
    },
    {
      label: "LinkedIn account",
      detail: "Third party sign in with using LinkedIn account",
      value: "Linkedin",
    },
    {
      label: "Github account",
      detail: "Third party sign in with using Github account",
      value: "Github",
    },
    {
      label: "LeetCode cookie",
      detail: "Use this, when you failed to sign in with the account.",
      value: "cookie",
    },
  ];

  private async showCredentialBox(method: string): Promise<any> {
    let id: string | undefined = await vscode.window.showInputBox({
      title: `${method} ID`,
      placeHolder: "Type your ID here",
      validateInput: (value: string): string | undefined =>
        value ? undefined : "ID should not be empty",
    });

    let password: string | undefined;
    if (method === "cookie") {
      // TODO: Cookie 입력 UI 구현
    } else {
      password = await vscode.window.showInputBox({
        title: `${method} password`,
        placeHolder: "Type your password here",
        password: true,
        validateInput: (value: string): string | undefined =>
          value ? undefined : "Password should not be empty",
      });
    }

    return [id, password];
  }

  private async requestSignIn(id: string, password: string): Promise<any> {
    // TODO: 각 method에 대한 API request 구현
    // TODO: withProgress 구현
    if (id === "a") {
      return Promise.resolve("success");
    } else {
      return Promise.reject("fail");
    }
  }

  public async handleSignIn() {
    let method: any = await vscode.window.showQuickPick(this.singInMenu);
    if (!method) return;

    const [id, password]: any = await this.showCredentialBox(method.value);
    console.log(id, password);

    try {
      let result = await this.requestSignIn(id, password);
      vscode.window.showInformationMessage("[Success] Welcome to LeetCoder!");
      vscode.commands.executeCommand("setContext", "leetup.userInfo", true);
    } catch (error: any) {
      console.log(error);
      vscode.window.showErrorMessage(
        "[Failed] Please check your account again. If you keep fail to sign in, use the cookie method."
      );
      return;
    }
  }
}

export default AccountManager;
