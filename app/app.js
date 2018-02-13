let electron = require('electron');
let bilibiliTools = require('bilibili-live');

const {Room, API} = bilibiliTools;

let LiveRoom = null;

function initRoom(url, windowHanle) {
    new Room({
        url
    }).connect().then(room => {
        room
            .on('danmaku.connect', () => {
                windowHanle.webContents.send('danmaku.connect', '正在连接至弹幕服务器');
            })
            .on('danmaku.connected', () => {
                windowHanle.webContents.send('danmaku.connected', '成功连接至弹幕服务器');

            })
            .on('danmaku.message', (msg) => {
                windowHanle.webContents.send('danmaku.message', msg);

            })
            .on('danmaku.close', () => {
                windowHanle.webContents.send('danmaku.close', '已断开与弹幕服务器的连接');
            })
            .on('danmaku.error', () => {
                windowHanle.webContents.send('danmaku.error', '与弹幕服务器的连接出现错误');
            })
            .on('newFans', (fans) => {
                windowHanle.webContents.send('danmaku.newFans', fans);
            })
            .on('info', (info) => {
                windowHanle.webContents.send('danmaku.info', info);
            });
        LiveRoom = room
    })
}

module.exports = initRoom;