declare const require;
require(`script-loader!./../../libs/vue.min.js`);
require(`script-loader!./../../libs/jquery.min.js`);
require(`script-loader!./../../libs/css/material.min.js`);
require(`./../../libs/css/material.min.css`);
require(`./../../libs/css/icon.css`);


declare let Vue;
declare let $;
let app = new Vue({
    el: '#app',
    template: require('./app.html'),
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
