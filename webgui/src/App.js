let bpyMap = {
    'gob.py': require("text-loader!../../src/static/bpy/gob.py")
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
        console.log('new App', this)
    }
    init(vm) {
        this.vm = vm
        vm.data1 = {
            activeNames: ['1', '2'],
            ZRemesherValue: 2,
            ZDynameshValue: 128,
            zscPath: `D:\\apps\\Pixologic ZBrush V4R7 P2 Portable\\Picologic ZBrush 4R7 P2\\ZScripts`,
        }
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
}
const app = new App()
export default app