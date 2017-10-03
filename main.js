const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// ����win�����ȫ������,����JavaScript������������ʱ,���ڱ��Զ��ر�.
let win

function createWindow () {
  //�������������
  win = new BrowserWindow({width: 800, height: 600})

  // ����Ӧ�õ� index.html
  win.loadURL('https://www.baidu.com')

  // �򿪿����߹���
  

  // �ر�windowʱ���������¼�.
  win.on('closed', () => {
    // ȡ������ window ����ͨ�����Ӧ��֧�ֶര�ڣ���Ὣ
    // ���ڴ洢��������,����Ӧ�ý���ɾ����.
    win = null
  })
}


// ��Electron��ɳ�ʼ����׼���������������ʱ���ô˷���
// ���� API ֻ��ʹ���� ready �¼�������
app.on('ready', createWindow)

// ���д��ڹر�ʱ�˳�Ӧ��.
app.on('window-all-closed', () => {
  // macOS�г����û����� `Cmd + Q` ��ʽ�˳�,����Ӧ����˵���ʼ�մ��ڻ״̬.
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // macOS�е��Dockͼ��ʱû���Ѵ򿪵�����Ӧ�ô���ʱ,��ͨ����Ӧ�����ؽ�һ������
  if (win === null) {
    createWindow()
  }
})

// �����������ű�����д����ʹ��require���������js�ļ�.