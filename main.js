const dialog = require('electron').dialog
const {autoUpdater} = require('electron-updater')
const ipc = require('electron').ipcMain
const electron = require('electron')
const glob = require('glob')
const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// 保持win对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let win
//loadDemos()
function createWindow () {
  //创建浏览器窗口
  win = new BrowserWindow({width: 800, height: 600})

  // 加载应用的 index.html
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'MainIndex.html'),
    protocol: 'file:',
    slashes: true
  }))

  // 打开开发者工具
  //win.webContents.openDevTools()
  
  // 关闭window时触发下列事件.
  win.on('closed', () => {
    // 取消引用 window 对象，通常如果应用支持多窗口，则会将
    // 窗口存储在数组中,现在应该进行删除了.
    win = null
  })
}


// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
// 部分 API 只能使用于 ready 事件触发后。
app.on('ready', createWindow)

// 所有窗口关闭时退出应用.
app.on('window-all-closed', () => {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (win === null) {
    createWindow()
  }
})

// 你可以在这个脚本中续写或者使用require引入独立的js文件.
app.on('ready',()=>{
  ipc.on('use-update-function',function (event){
    let message={
      error:'检查更新出错',
      checking:'正在检查更新……',
      updateAva:'检测到新版本，正在下载……',
      updateNotAva:'现在使用的就是最新版本，不用更新',
    };
    const os = require('os');
    autoUpdater.setFeedURL('http://test-qus.oss-cn-beijing.aliyuncs.com');
    autoUpdater.on('error', function(error){
      sendUpdateMessage(message.error)
    });
    autoUpdater.on('checking-for-update', function() {
      sendUpdateMessage(message.checking)
    });
    autoUpdater.on('update-available', function(info) {
        sendUpdateMessage(message.updateAva)
    });
    autoUpdater.on('update-not-available', function(info) {
        sendUpdateMessage(message.updateNotAva)
    });
    
    // 更新下载进度事件
    autoUpdater.on('download-progress', function(progressObj) {
      win.webContents.send('downloadProgress', progressObj)
    })
    autoUpdater.on('update-downloaded',  function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        //ipc.on('isUpdateNow', (e, arg) => {
          //弹出对话框，询问用户是否退出并更新
            const options={
                 type:'info',
                 title:'Upgrade now?', 
                 message:"Are you sure that quit and upgrade the application right NOW?",
                 button:['Yes','No']
            }
            dialog.showMessageBox(options,function(index){
              if(index==0) 
              autoUpdater.quitAndInstall();
              
            })
            //some code here to handle event
            //autoUpdater.quitAndInstall();
       // })
        //let downloaded="all file is downloaded";
        //sendUpdateMessage(downloaded)
        //win.webContents.send('isUpdateNow')
    });
    
    //执行自动更新检查
    autoUpdater.checkForUpdates();
  });
})



function sendUpdateMessage(text){
  win.webContents.send('message', text)
}


/*
function loadDemos () {
  var files = glob.sync(path.join(__dirname, 'main-process/*.js'))
  files.forEach(function (file) {
    require(file)
  })
 
}
*/