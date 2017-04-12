<template>
    <div>
        <el-button type="primary"
                   @click.native='bpy("gob.py")'>export</el-button>
        <el-button @click.native='execCodeLocal("ctrlz.py")'>undo</el-button>
        <el-button @click.native='execCodeLocal("zbRedo.py")'>redo</el-button>
        <el-collapse v-model="data1.activeNames"
                     @change="handleChange">
            <el-collapse-item title="ZRemesher"
                              name="1">
                <div>Polygons count {{data1.ZRemesherValue}} K
                    <el-button type="text"
                               @click.native='gob("ZRemesher",0)'>default</el-button>
                </div>
                <div class="block">
                    <el-slider v-model="data1.ZRemesherValue"
                               :step="1"
                               :min="1"
                               :max="20"
                               :show-tooltip="false"
                               show-stops></el-slider>
                </div>
                <el-input-number size="small"
                                 v-model="data1.ZRemesherValue"
                                 style="width:98px" />
    
                <div>
                    <el-button type="primary"
                               @click.native='gob("ZRemesher",data1.ZRemesherValue)'>{{data1.ZRemesherValue}}K</el-button>
                    <el-button type="primary"
                               size='small'
                               @click.native='gob("ZRemesher",5)'>5K</el-button>
                    <el-button type="primary"
                               size='small'
                               @click.native='gob("ZRemesher",10)'>10K</el-button>
                </div>
            </el-collapse-item>
    
            <el-collapse-item title="ZDynamesh"
                              name="2">
                <div>Resolution {{data1.ZDynameshValue}} </div>
                <el-input-number size="small"
                                 v-model="data1.ZDynameshValue"
                                 style="width:158px" />
    
                <div>
                    <el-button type="primary"
                               @click.native='gob("Dynamesh",data1.ZDynameshValue)'>{{data1.ZDynameshValue}}</el-button>
                    <el-button type="primary"
                               size='small'
                               @click.native='gob("Dynamesh",16)'>16</el-button>
                    <el-button type="primary"
                               size='small'
                               @click.native='gob("Dynamesh",32)'>32</el-button>
                    <el-button type="primary"
                               size='small'
                               @click.native='gob("Dynamesh",512)'>512</el-button>
                    <el-button type="primary"
                               size='small'
                               @click.native='gob("Dynamesh",4096)'>4096</el-button>
                </div>
            </el-collapse-item>
            <el-collapse-item title="Setting"
                              name="3">
                <div>
                    <el-input placeholder="ZBrush/ZScripts/"
                              v-model="data1.zscPath">
                    </el-input>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import app from '../App'
export default {
    data() {
        return app
    },
    methods: {
        handleChange() {
        },
        bpy(name) {
            app.bpy(name)
        },
        execCodeLocal(name) {
            app.execCodeLocal(name)
        },
        gob(mod, v) {
            app.gob(mod, v)
        },
        // execCodeLocal: app.execCodeLocal
    }
}
</script>