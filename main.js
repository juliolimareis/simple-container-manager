const { app, BrowserWindow } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

require('@electron/remote/main').initialize()

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
			nodeIntegration: true,
      enableRemoteModule: true,
			contextIsolation: false
    }
  })

  win.loadURL(
		isDev 
			? 'http://localhost:3111'
			: `file://${path.join(__dirname, '../build/index.html')}`
		)
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('active', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})
