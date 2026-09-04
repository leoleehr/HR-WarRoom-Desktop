/**
 * HR 戰情室 · Electron 主程式
 * Version: 1.0
 */

const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');

// 單一實例鎖：避免使用者開啟多份
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1480,
    height: 920,
    minWidth: 1100,
    minHeight: 720,
    icon: path.join(__dirname, 'assets', 'icon.png'),
    title: 'HR 戰情室 · 工作紀錄與職能分析簿',
    backgroundColor: '#0a0a0f',
    autoHideMenuBar: false,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // 外部連結改用系統瀏覽器開啟
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  const menuTemplate = [
    {
      label: '檔案',
      submenu: [
        {
          label: '開啟資料儲存資料夾',
          click: () => { shell.openPath(app.getPath('userData')); }
        },
        { type: 'separator' },
        { role: 'quit', label: '結束程式' }
      ]
    },
    {
      label: '檢視',
      submenu: [
        { role: 'reload', label: '重新整理' },
        { role: 'forceReload', label: '強制重新整理' },
        { type: 'separator' },
        { role: 'resetZoom', label: '原始大小' },
        { role: 'zoomIn', label: '放大' },
        { role: 'zoomOut', label: '縮小' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: '全螢幕' }
      ]
    },
    {
      label: '開發者',
      submenu: [
        { role: 'toggleDevTools', label: '開發者工具' }
      ]
    },
    {
      label: '說明',
      submenu: [
        {
          label: '關於 HR 戰情室',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: '關於 HR 戰情室',
              message: 'HR 戰情室 · 工作紀錄與職能分析簿',
              detail:
                '版本：1.0\n' +
                'Powered by Electron ' + process.versions.electron + '\n\n' +
                '功能：每日工作記錄、規劃對照、分類分析、職能說明書生成、CSV 匯入匯出。\n\n' +
                '本機資料路徑：' + app.getPath('userData') + '\n\n' +
                '© 2026 CMoney HR Department',
              buttons: ['確定']
            });
          }
        }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    menuTemplate.unshift({
      label: app.name,
      submenu: [
        { role: 'about', label: '關於 ' + app.name },
        { type: 'separator' },
        { role: 'services', label: '服務' },
        { type: 'separator' },
        { role: 'hide', label: '隱藏 ' + app.name },
        { role: 'hideothers', label: '隱藏其他' },
        { role: 'unhide', label: '全部顯示' },
        { type: 'separator' },
        { role: 'quit', label: '結束 ' + app.name }
      ]
    });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
