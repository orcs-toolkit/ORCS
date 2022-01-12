const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	receive: (channel, func) => {
		let validChannels = ['sysInfo:fetch'];
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (event, ...args) => func(...args));
		}
	},
	ipcRenderer: ipcRenderer,
});
