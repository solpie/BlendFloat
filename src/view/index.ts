declare const require;
require(`script-loader!./../../libs/jquery.min.js`);
require(`script-loader!./../../libs/webgui.js`);
const bpyMap = {
    'gob.py': require(`text-loader!./../static/bpy/gob.py`)
}
declare let Vue;
declare let $;
let app = new Vue({
    el: '#app',
    template: require('./app.html'),
    data: {
        zscPath: `D:\\apps\\Pixologic ZBrush V4R7 P2 Portable\\Picologic ZBrush 4R7 P2\\ZScripts`,
        zrPolygonsCount: 2,
        zdResolution: 128
    },
    methods: {
        execCode: function (scriptName) {
            //   var code = $('#bpy').val();
            //     console.log('exec Code', code);
            //     //import bpy;bpy.ops.object.select_all()
            //     $.post('/exec', {
            //         "bpy": code
            //     }, function(res) {
            //         console.log(res);

            //     })
        },
        gob(mod, v) {
            console.log(mod, v)
            $.post('/gob', {
                mod: mod, value: v, zscPath: this.zscPath
            })
        },
        bpy: function (scriptName) {
            let b = bpyMap[scriptName]
            if (b) {
                $.post('/exec', {
                    bpy: b
                })
            }
            // let g = new Date().getTime()
            // $.get('/static/bpy/' + scriptName + '?t=' + g, function (res) {
            //     console.log(res)
            //     $.post('/exec', {
            //         bpy: res
            //     })
            // })
        }
    }
})
