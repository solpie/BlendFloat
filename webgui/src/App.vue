<template>
  <div id="app">
    <el-tabs type="border-card">
      <el-tab-pane style="width:250px">
        <el-button type="primary" @click.native='bpy("gob.py")'>export</el-button>
        <span slot="label"><i class="el-icon-edit"></i> ZBrush</span>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="ZRemesher" name="1">
            <div>Polygons count {{ZRemesherValue}} K</div>
            <div class="block">
              <el-slider v-model="ZRemesherValue" :step="1" :min="1" :max="20" :show-tooltip="false" show-stops></el-slider>
            </div>
            <el-input-number size="small" v-model="ZRemesherValue" style="width:98px" />
  
            <div>
              <el-button type="primary" @click.native='gob("ZRemesher",ZRemesherValue)'>{{ZRemesherValue}}K</el-button>
              <el-button type="primary" size='small' @click.native='gob("ZRemesher",5)'>5K</el-button>
              <el-button type="primary" size='small' @click.native='gob("ZRemesher",10)'>10K</el-button>
            </div>
          </el-collapse-item>
  
          <el-collapse-item title="ZDynamesh" name="2">
            <div>Resolution {{ZDynameshValue}} </div>
            <el-input-number size="small" v-model="ZDynameshValue" style="width:158px" />
  
            <div>
              <el-button type="primary" @click.native='gob("Dynamesh",ZDynameshValue)'>{{ZDynameshValue}}</el-button>
              <el-button type="primary" size='small' @click.native='gob("Dynamesh",16)'>16</el-button>
              <el-button type="primary" size='small' @click.native='gob("Dynamesh",32)'>32</el-button>
              <el-button type="primary" size='small' @click.native='gob("Dynamesh",512)'>512</el-button>
              <el-button type="primary" size='small' @click.native='gob("Dynamesh",4096)'>4096</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="Setting" name="3">
            <div>
              <el-input placeholder="ZBrush/ZScripts/" v-model="zscPath">
              </el-input>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="Console">Console2</el-tab-pane>
      <el-tab-pane label="Setting">
        <el-input placeholder="9527" v-if='isEletron' v-model="port">
          <template slot="prepend">localhost port:
</template>
        </el-input>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  let bpyMap = {
    'gob.py': require("text-loader!../../src/static/bpy/gob.py")
  }
  import electron from './electron.js'
  // console.log(bpyMap)
  export default {
    data() {
      return {
        activeNames: ['1', '2'],
        ZRemesherValue: 2,
        ZDynameshValue: 128,
        zscPath: `D:\\apps\\Pixologic ZBrush V4R7 P2 Portable\\Picologic ZBrush 4R7 P2\\ZScripts`,
        port: 9527,
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
      if (this.isEletron) {
        electron()
      }
    },
    methods: {
      handleChange(){

      },
      api(url) {
        if (this.isEletron)
          return 'http://localhost:' + this.port + url
        return url
      },
      execCode() {
        console.log('ssssssss')
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
        this.$http.post(this.api('/gui/gob'), {
          mod: mod,
          value: v,
          zscPath: this.zscPath
        })
      },
      bpy(scriptName) {
        let b = bpyMap[scriptName]
        if (b) {
          this.$http.post(this.api('/gui/exec'), {
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
    }
  }
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
  }
</style>
