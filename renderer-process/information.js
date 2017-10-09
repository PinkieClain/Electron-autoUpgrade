const ipc = require('electron').ipcRenderer
const informationBtn = document.getElementById('information-dialog')






informationBtn.addEventListener('click', function (event){
      ipc.send('use-update-function')
}
)



ipc.on('message',function(event,text){
  document.getElementById('information').innerHTML=text
})
ipc.on('downloadProgress',function(event,progressObj){
  document.getElementById('download-information').innerHTML=progressObj
})








/*
const informationBtn = document.getElementById('information-dialog')

informationBtn.addEventListener('click', function (event) {
  ipc.send('open-information-dialog')
})

ipc.on('information-dialog-selection', function (event, index) {
  let message = '你选择了 '
  if (index === 0) message += '是.'
  else message += '否.'
  document.getElementById('info-selection').innerHTML = message
})
*/