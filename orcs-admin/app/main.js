const { app, BrowserWindow, Notification } = require('electron');
const { ipcMain } = require('electron/main');
const path = require('path');

let splashWindow, mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1500,
		height: 800,
		webPreferences: {
			preload: path.join(__dirname, './preload.js'),
			nodeIntegration: false,
			contextIsolation: true,
		},
		resizable: false,
		show: false,
	});

	splashWindow = new BrowserWindow({
		width: 500,
		height: 300,
		resizable: false,
		frame: false,
		show: false,
	});

	splashWindow.loadFile('app/splash.html');
	mainWindow.loadURL('http://localhost:3000');

	splashWindow.webContents.on('did-finish-load', () => {
		splashWindow.show();
	});

	mainWindow.webContents.on('did-finish-load', () => {
		setTimeout(() => {
			splashWindow.destroy();
			mainWindow.show();
		}, 4000);
	});

	mainWindow.webContents.openDevTools();

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

const NOTIFICATION_TITLE = 'New system added!';
const NOTIFICATION_BODY = 'System of mac address: 1232134321412 has connected!';

function showNotification() {
	const notification = new Notification({
		title: NOTIFICATION_TITLE,
		body: NOTIFICATION_BODY,
		urgency: 'normal',
		timeoutType: 'default',
	});

	notification.show();
	notification.on('click', notification.show());
}

// Electron `app` is ready
app.on('ready', createWindow);
app.whenReady().then(createWindow).then(showNotification);

// Quit when all windows are closed - (Not macOS - Darwin)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

// When app icon is clicked and app is running, (macOS) recreate the BrowserWindow
app.on('activate', () => {
	if (mainWindow === null) createWindow();
});

ipcMain.on('toMain', (event, args) => {
	console.log('Received args', args);
	const status = args.type === 'connected' ? 'normal' : 'critical';
	const notification = new Notification({
		title:
			args.type === 'connected'
				? 'New device added!'
				: 'A device has disconnected!',
		body: args.data,
		urgency: status,
	});
	notification.show();
});
