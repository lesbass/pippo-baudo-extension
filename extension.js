const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const provider = new PippoBaudoViewProvider(context.extensionUri);
    
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('pippoBaudoView', provider)
    );
}

class PippoBaudoViewProvider {
    constructor(extensionUri) {
        this._extensionUri = extensionUri;
    }

    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.joinPath(this._extensionUri, 'media')]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }

    _getHtmlForWebview(webview) {
        const pippoBaudoImagePath = vscode.Uri.joinPath(this._extensionUri, 'media', 'pippo-baudo.jpg');
        const pippoBaudoImageSrc = webview.asWebviewUri(pippoBaudoImagePath);
        
        return `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pippo Baudo</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
            font-family: var(--vscode-font-family);
        }
        h1 {
            font-size: 1.5em;
            margin-bottom: 20px;
            color: var(--vscode-textLink-foreground);
        }
        img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .caption {
            margin-top: 15px;
            font-style: italic;
            font-size: 0.9em;
            color: var(--vscode-descriptionForeground);
        }
        .caption a {
            color: var(--vscode-textLink-foreground);
        }
    </style>
</head>
<body>
    <h1>🎭 Pippo Baudo</h1>
    <img src="${pippoBaudoImageSrc}" alt="Pippo Baudo" />
    <p class="caption">Foto: Franco Ferrajuolo - <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a></p>
    <p class="caption"><a href="https://it.wikipedia.org/wiki/Pippo_Baudo">Wikipedia</a></p>
    <p class="caption">Il Maestro della televisione italiana</p>
</body>
</html>`;
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
