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
import app from './App'
export default {
  created() {
    app.init(this)
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
