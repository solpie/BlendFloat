declare const require;
// require(`script-loader!./../../libs/vue.min.js`);
require(`script-loader!./../../libs/jquery.min.js`);
// require(`script-loader!./../../libs/css/material.min.js`);
// require(`./../../libs/css/material.min.css`);
// require(`./../../libs/css/icon.css`);
require(`script-loader!./../../libs/webgui.js`);


declare let Vue;
// let $ = {
//     get: (url, cb) => {
//         var request = new XMLHttpRequest();
//         request.open('GET', url, true);
//         request.onload = function () {
//             if (request.status >= 200 && request.status < 400) {
//                 // Success!
//                 // var data = JSON.parse(request.responseText);
//                 if (cb)
//                     cb(request.responseText)
//             } else {
//                 // We reached our target server, but it returned an error
//             }
//         };
//         request.onerror = function () {
//             // There was a connection error of some sort
//         };

//         request.send();
//     },
//     post: (url, data, cb?) => {
//         var request = new XMLHttpRequest();
//         request.open('POST', url, true);
//         //       data: JSON.stringify(data),
//         // headers: { "Content-Type": "application/json" },
//         request.setRequestHeader('Content-Type', 'application/json');
//         request.send(data);
//     }
// };
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
            let g = new Date().getTime()
            $.get('/static/bpy/' + scriptName + '?t=' + g, function (res) {
                console.log(res)
                $.post('/exec', {
                    bpy: res
                })
            })
        }
    }
})
