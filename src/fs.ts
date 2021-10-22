import * as vscode from 'vscode';
import * as fs from 'fs';
import { basename } from 'path';

export class FS {

    constructor() { }

    public createFile(file: string): void {
        let wsfolders = vscode.workspace.workspaceFolders;
        if (wsfolders && wsfolders.length !== 0) {
            let filePath = this.getPath(file);

            if (this.isFile(filePath)) {
                this.createSubFolder(filePath, true);
                fs.writeFileSync(filePath, '');
            }
        }
    }

    public createFolder(folder: string): void {
        let wsfolders = vscode.workspace.workspaceFolders;
        if (wsfolders && wsfolders.length !== 0) {
            let folderPath = this.getPath(folder);
            this.createSubFolder(folderPath);
        }
    }

    private createSubFolder(path: string, fromFile: boolean = false): void {
        if (fromFile && this.isFile(path)) {
            let item = path.split('/');
            item.splice(item.length - 1, 1);
            path = item.join('/');
        }
        fs.mkdirSync(path, { recursive: true });

    }

    private getPath(name: string): string {
        let wsfolders = vscode.workspace.workspaceFolders;
        if (wsfolders && wsfolders.length !== 0) {
            let index = this.getWSFolderIndex(name);
            name = name.replace('ws:', '');
            if (name.slice(0, 1) !== '/') {
                name = '/' + name;
            }
            return wsfolders[index].uri.fsPath + name;
        } else {
            return name;
        }
    }

    private getWSFolderIndex(name: string): number {
        let wsfolders = vscode.workspace.workspaceFolders;
        if (name.slice(0, 3) === 'ws:' && wsfolders && wsfolders.length !== 0) {
            name = name.split('/')[0].replace('ws:', '');
            let index = wsfolders.find(item => item.name === name)?.index;
            if (index === undefined || index < 0) {
                index = 0;
            }
            return index;
        } else {
            return 0;
        }
    }

    private isFile(name: string): boolean {
        return name.includes('.');
    }
}