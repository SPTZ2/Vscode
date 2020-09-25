// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {



	var create_define = vscode.commands.registerCommand('SPTZ2.define', function define() {
		let editor = vscode.window.activeTextEditor;
		var range = new vscode.Range(editor.selection.start, editor.selection.end)
		var text = editor.document.getText(range);
		vscode.window.showInputBox().then(onfufill=>{
			var input = onfufill.toUpperCase();
			const def = "#define "+input+" ("+text+")\n";
			vscode.window.activeTextEditor.edit(editBulider =>{
				var position = new vscode.Position(0,0);
				editBulider.insert(position,def);
			})
		})
		
	})
	context.subscriptions.push(create_define);

	const terminal = vscode.window.createTerminal("IAR");
	terminal.show();
	//Register command build
	var command_build = vscode.commands.registerCommand('SPTZ2.build', function Commend_Build() {
		terminal.sendText("& 'C:\\Users\\Xiaxianghu\\Desktop\\TOOLS\\update_IAR.ps1' .\\EWARM\\GC1016.ewp");
		terminal.sendText("& 'C:\\Program Files (x86)\\IAR Systems\\Embedded Workbench 6.0\\common\\bin\\IarBuild.exe' .\\EWARM\\GC1016.ewp -clean Debug -log all");
		terminal.sendText("& 'C:\\Program Files (x86)\\IAR Systems\\Embedded Workbench 6.0\\common\\bin\\IarBuild.exe' .\\EWARM\\GC1016.ewp -make Debug -log info");
		terminal.sendText("explorer .\\EWARM\\Debug\\Exe");
	})
	context.subscriptions.push(command_build);

	//Register command info
	var command_info = vscode.commands.registerCommand('SPTZ2.info', function Commend_Info() {
		terminal.sendText("& 'C:\\Users\\Xiaxianghu\\Desktop\\TOOLS\\update_IAR.ps1' .\\EWARM\\GC1016.ewp");
		terminal.sendText("& 'C:\\Program Files (x86)\\IAR Systems\\Embedded Workbench 6.0\\common\\bin\\IarBuild.exe' .\\EWARM\\GC1016.ewp -clean Debug -log all");
		terminal.sendText("& 'C:\\Program Files (x86)\\IAR Systems\\Embedded Workbench 6.0\\common\\bin\\IarBuild.exe' .\\EWARM\\GC1016.ewp -make Debug -log all >.\\Info.txt");
	})
	context.subscriptions.push(command_info);

	//create status build
	var status = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	status.text = "build";
	status.command = "SPTZ2.build";
	status.show();
	context.subscriptions.push(status);
	//create status info
	var status2 = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
	status2.text = "info";
	status2.command = "SPTZ2.info";
	status2.show();
	context.subscriptions.push(status2);

}
exports.activate = activate;

function deactivate() { }


module.exports = {
	activate,
	deactivate
}
