export default () => {
    console.log('electron created!')
    const electron = window['require']('electron')
    let win = electron.remote.getCurrentWindow();
    console.log(win)
    win.setSize(350, 650)
}