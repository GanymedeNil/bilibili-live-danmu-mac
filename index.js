// 引入electron模块
const electron = require('electron');
const path = require('path');
const url = require('url');
const bilibliLive= require('./app/app');
// 用来控制应用的生命周期
let app = electron.app;
let ipcMain  = electron.ipcMain;

// 用来创建浏览器窗口
let BrowserWindow = electron.BrowserWindow;


// 创建一个全局变量，相当于普通网页中的 window 对象
let mainWindow;
let appWindow;

// 当软件触发 ready 事件之后，创建浏览器窗口
app.on('ready', function() {
    appWindow = new BrowserWindow({
        width: 300,
        height:180,
        title:'Config'
    });
    appWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'config.html'),
        protocol: 'file:',
        slashes:true
    }));
    appWindow.on('close', function(){
        appWindow = null;
    });
});
app.on('window-all-closed', () => {
    app.quit();
});
ipcMain.on('bilibili:add',function (e,roomid) {
    createAppWindow(roomid);
    appWindow.close();
});

function createAppWindow(roomid){

    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({
        width:300,
        height: 400,
        x:electron.screen.getPrimaryDisplay().workAreaSize.width,
        y:electron.screen.getPrimaryDisplay().workAreaSize.height,
        alwaysOnTop:true,
        resizable:false,
        transparent: true,
        frame: false,

    });
    bilibliLive(roomid,mainWindow);

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes:true
    }));
    mainWindow.on('closed', function() {
        mainWindow = null;
    });


}