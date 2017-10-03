const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// 保持win对象的全局引用,避免JavaScript对象被垃圾回收时,窗口被自动关闭.
let win

function createWindow () {
  //创建浏览器窗口
  win = new BrowserWindow({width: 800, height: 600})

  // 加载应用的 index.html
  win.loadURL('https://www.baidu.com')

  // 打开开发者工具
  

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