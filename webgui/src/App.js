let bpyMap = {
    'gob.py': require("text-loader!../../src/static/bpy/gob.py"),
}
const localScript = {
    'zbUndo.py': require("text-loader!./lpy/zbUndo.py"),
    'zbRedo.py': require("text-loader!./lpy/zbRedo.py"),
    'zbFocus.py': require("text-loader!./lpy/zbFocus.py"),
}
class App {
    constructor() {
        this.vm = null
        this.port = 9527
        this.data1 = {
            activeNames: ['1', '2'],
            ZRemesherValue: 2,
            ZDynameshValue: 128,
            zscPath: `D:\\apps\\Pixologic ZBrush V4R7 P2 Portable\\Picologic ZBrush 4R7 P2\\ZScripts`,
        }
        this.isEletron = window['require']
        if (this.initElectron)
            this.initElectron()
        console.log('new App', this)
    }
    initElectron() {
        console.log('electron created!')
        const electron = window['require']('electron')
        let win = electron.remote.getCurrentWindow();
        console.log(win)
        win.setSize(350, 650)
        win.setAlwaysOnTop(true)
    }
    init(vm) {
        this.vm = vm
        vm.data1 = {
            activeNames: ['1', '2'],
            ZRemesherValue: 2,
            ZDynameshValue: 128,
            zscPath: `D:\\apps\\Pixologic ZBrush V4R7 P2 Portable\\Picologic ZBrush 4R7 P2\\ZScripts`,
        }
        vm.$notify({
            title: 'It Works',
            message: 'BlendFload created!',
            duration: 1000
        })
    }
    api(url) {
        console.log('api', this)
            // if (this.isEletron)
            //     return 'http://localhost:' + this.port + url
        return url
    }
    bpy(scriptName) {
        let b = bpyMap[scriptName]
        if (b) {
            this.vm.$http.post(this.api('/gui/exec'), {
                bpy: b
            })
        }
        // var g = new Date().getTime()
        // $.get('/static/bpy/' + scriptName + '?t=' + g, function (res) {
        //     console.log(res)
        //     $.post('/exec', {
        //         bpy: res
        //     })
        // })
    }
    gob(mod, v) {
        console.log(mod, v)
        this.vm.$http.post(this.api('/gui/gob'), {
            mod: mod,
            value: v,
            zscPath: this.zscPath
        })
    }

    execCodeBlender() {
        console.log('ssssssss')
            //   var code = $('#bpy').val();
            //     console.log('exec Code', code);
            //     //import bpy;bpy.ops.object.select_all()
            //     $.post('/exec', {
            //         "bpy": code
            //     }, function(res) {
            //         console.log(res);

        //     })
    }
    execCodeLocal(scriptName) {
        let lpy = localScript[scriptName]
        this.vm.$http.post(this.api('/gui/py'), {
            py: lpy
        })
    }
}
const app = new App()
export default app