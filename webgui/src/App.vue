<template>
  <div id="app">
    <el-tabs type="border-card">
      <el-tab-pane style="width:250px">
        <span slot="label"><i class="el-icon-edit"></i> ZBrush</span>
        <ZBrushPanel></ZBrushPanel>
      </el-tab-pane>
      <el-tab-pane label="Console">
        <el-button type="primary"
                   size='small'
                   @click.native='execCodeLocal'>execCodeLocal</el-button>
  
      </el-tab-pane>
      <el-tab-pane label="Setting">
        <SettingPanel></SettingPanel>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import electron from './electron.js'
import app from './App'
// console.log(bpyMap)
// export default app
export default {
  data() {
    return {
      // activeNames: ['1', '2'],
      // port: 9527,
      // dataSetting: { port: 9527 },
      // dataZBrush: {
      //   ZRemesherValue: 2,
      //   ZDynameshValue: 128,
      //   zscPath: `D:\\apps\\Pixologic ZBrush V4R7 P2 Portable\\Picologic ZBrush 4R7 P2\\ZScripts`,
      // },
      isEletron: window['require'],
      value1: 1
    }
  },
  created() {
    this.$notify({
      title: 'It Works',
      message: 'BlendFload created!',
      duration: 1000
    })
    // this.isEletron = window['require']
    // if(!this.isEletron)
    app.init(this)
    if (this.isEletron) {
      electron()
    }
  },
  // mounted() {
  // },
  // methods: {

  //   api(url) {
  //     if (this.isEletron)
  //       return 'http://localhost:' + this.port + url
  //     return url
  //   },
  //   execCodeBlender() {
  //     console.log('ssssssss')
  //     //   var code = $('#bpy').val();
  //     //     console.log('exec Code', code);
  //     //     //import bpy;bpy.ops.object.select_all()
  //     //     $.post('/exec', {
  //     //         "bpy": code
  //     //     }, function(res) {
  //     //         console.log(res);

  //     //     })
  //   },
  //   execCodeLocal() {
  //     this.$http.post(this.api('/gui/py'), {
  //       py: 'print("233")'
  //     })
  //   },
  //   gob(mod, v) {
  //     console.log(mod, v)
  //     this.$http.post(this.api('/gui/gob'), {
  //       mod: mod,
  //       value: v,
  //       zscPath: this.zscPath
  //     })
  //   },
  //   bpy(scriptName) {
  //     let b = bpyMap[scriptName]
  //     if (b) {
  //       this.$http.post(this.api('/gui/exec'), {
  //         bpy: b
  //       })
  //     }
  //     // var g = new Date().getTime()
  //     // $.get('/static/bpy/' + scriptName + '?t=' + g, function (res) {
  //     //     console.log(res)
  //     //     $.post('/exec', {
  //     //         bpy: res
  //     //     })
  //     // })
  //   }
  // }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
