// 引入electron模块
let electron = require('electron');
let bilibliLive= require('./app/app');
// 用来控制应用的生命周期
let app = electron.app;


// 用来创建浏览器窗口
let BrowserWindow = electron.BrowserWindow;


// 创建一个全局变量，相当于普通网页中的 window 对象
let mainWindow;


// 当软件触发 ready 事件之后，创建浏览器窗口
app.on('ready', function() {

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
    bilibliLive(388,mainWindow);
    //mainWindow.toggleDevTools();

    // 加载 example 目录下的index.html
    mainWindow.loadURL('file://'+__dirname+'/index.html');
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});

