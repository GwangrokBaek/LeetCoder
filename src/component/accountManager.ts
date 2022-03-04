import * as vscode from "vscode";
import { submitStatusBar } from "../extension";

interface QuickPickOptionsProps extends vscode.QuickPickItem {
  value: string;
}

export class AccountManager {
  constructor() {}

  private _platformOpts: QuickPickOptionsProps[] = [
    {
      label: "LeetCode",
      detail: "Sign in with LeetCode account",
      value: "Leetcode",
    },
    {
      label: "BaekJoon",
      detail: "Sign in with BaekJoon account",
      value: "Baekjoon",
    },
  ];

  private _lcSignInOpts: QuickPickOptionsProps[] = [
    {
      label: "LeetCode account",
      detail: "Sign in with LeetCode ID and Password",
      value: "Leetcode",
    },
    {
      label: "LinkedIn account",
      detail: "Third party sign in with LinkedIn account",
      value: "Linkedin",
    },
    {
      label: "Github account",
      detail: "Third party sign in with Github account",
      value: "Github",
    },
    {
      label: "LeetCode cookie",
      detail:
        "Use this, when you keep failed to sign in with the LeetCode account.",
      value: "cookie",
    },
  ];

  private async _showCredentialBox(method: string): Promise<any> {
    let id: string | undefined = await vscode.window.showInputBox({
      title: `${method} ID`,
      placeHolder: "Type your ID here",
      validateInput: (value: string): string | undefined =>
        value ? undefined : "ID should not be empty",
    });
    if (id === undefined) {
      return;
    }

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

  private async _requestToLc(data: any): Promise<string> {
    // TODO: 각 method에 대한 API request 구현
    // TODO: withProgress 구현
    if (data.id === "leetcode") {
      return Promise.resolve("success");
    } else {
      return Promise.reject("fail");
    }
  }

  private async _requestToBj(data: any): Promise<string> {
    // TODO: 각 method에 대한 API request 구현
    // TODO: withProgress 구현
    if (data.id === "baekjoon") {
      return Promise.resolve("success");
    } else {
      return Promise.reject("fail");
    }
  }

  private async _handleRequestSignIn(
    id: string,
    password: string,
    platform: string
  ): Promise<boolean> {
    let result: boolean;
    console.log(id, password);
    try {
      if (platform === "Leetcode") {
        await this._requestToLc({ id, password });
      } else {
        await this._requestToBj({ id, password });
      }
      vscode.window.showInformationMessage(
        `[Success] Successfully signed in with ${platform} account`
      );
      result = true;
    } catch (error: any) {
      console.log(error);
      vscode.window.showErrorMessage(
        "[Error] Please check your account again."
      );
      result = false;
    }

    return result;
  }

  public async handleLeetCodeSignIn(): Promise<boolean> {
    let result: boolean = false;

    let method: any = await vscode.window.showQuickPick(this._lcSignInOpts);
    if (!method) {
      return result;
    }

    const [id, password]: any = await this._showCredentialBox(method.value);
    if (id === undefined || password === undefined) {
      return result;
    }

    result = await this._handleRequestSignIn(id, password, method.value);

    return result;
  }

  public async handleBaekJoonSignIn(): Promise<boolean> {
    let result: boolean = false;

    const [id, password]: any = await this._showCredentialBox("Baekjoon");
    if (id === undefined || password === undefined) {
      return result;
    }

    result = await this._handleRequestSignIn(id, password, "Baekjoon");

    return result;
  }

  public async handleSignIn() {
    let platform: any = await vscode.window.showQuickPick(this._platformOpts);
    if (!platform) return;

    let result: any;
    if (platform.value === "Leetcode") {
      result = await this.handleLeetCodeSignIn();
    } else {
      result = await this.handleBaekJoonSignIn();
    }

    if (result) {
      console.log(result);
      vscode.commands.executeCommand("setContext", "leetcoder.userInfo", true);
      submitStatusBar.show();
    }
  }

  // TODO
  private async _handleRequestSignOut(platform: string): Promise<boolean> {
    let result: boolean;
    try {
      if (platform === "Leetcode") {
        await this._requestToLc({ id: "leetcode" });
      } else {
        await this._requestToBj({ id: "baekjoon" });
      }
      vscode.window.showInformationMessage(
        `[Success] Successfully signed out with ${platform} account`
      );
      result = true;
    } catch (error: any) {
      console.log(error);
      vscode.window.showErrorMessage(
        `[Error] Failed to signed out with ${platform} account.`
      );
      result = false;
    }

    return result;
  }

  public async handleLeetCodeSignOut(): Promise<boolean> {
    let result: boolean = await this._handleRequestSignOut("Leetcode");

    return result;
  }

  public async handleBaekJoonSignOut(): Promise<boolean> {
    let result: boolean = await this._handleRequestSignOut("Baekjoon");

    return result;
  }

  // TODO
  public async handleSignOut(platform: string) {
    let result: any;
    if (platform === "Leetcode") {
      result = await this.handleLeetCodeSignOut();
    } else {
      result = await this.handleBaekJoonSignOut();
    }

    if (result) {
      vscode.commands.executeCommand("setContext", "leetcoder.userInfo", false);
      submitStatusBar.hide();
    }
  }

  // TODO
  public async getCurrentSession() {}
}
