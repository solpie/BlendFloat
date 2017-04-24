<template>
    <div>
        <el-button type="primary"
                   @click.native='bpy("gob.py")'>export</el-button>
        <el-button size='small'
                   @click.native='execCodeLocal("zbFocus.py")'>F</el-button>
        <el-button size='small'
                   @click.native='execCodeLocal("zbUndo.py")'>undo</el-button>
        <el-button size='small'
                   @click.native='execCodeLocal("zbRedo.py")'>redo</el-button>
        <el-collapse v-model="zb.activeNames"
                     @change="handleChange">
            <el-collapse-item title="ZRemesher"
                              name="1">
                <div>Polygons count {{zb.ZRemesherValue}} K
                    <el-button type="text"
                               @click.native='gob("ZRemesher",0)'>default</el-button>
                </div>
                <div class="block">
                    <el-slider v-model="zb.ZRemesherValue"
                               :step="1"
                               :min="1"
                               :max="20"
                               :show-tooltip="false"
                               show-stops></el-slider>
                                      </div>
                <el-input-number size="small"
                                 v-model="zb.ZRemesherValue"
                                 style="width:98px" />
                                    <el-button type="text"
                               @click.native='zbCloseHole' style="position:relative;top:-10px">close hole</el-button>
    
                <div>
                    <el-button type="primary"
                               @click.native='gob("ZRemesher",zb.ZRemesherValue)'>{{zb.ZRemesherValue}}K</el-button>
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
                <div>Resolution {{zb.ZDynameshValue}} </div>
                <el-input-number size="small"
                                 v-model="zb.ZDynameshValue"
                                 style="width:158px" />
    
                <div>
                    <el-button type="primary"
                               @click.native='gob("Dynamesh",zb.ZDynameshValue)'>{{zb.ZDynameshValue}}</el-button>
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
                              v-model="zb.zscPath">
                    </el-input>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import app from '../App'
import { lpy, bpy } from '../lpy/zbrush'
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
        zbCloseHole(){
            let zp = app.zb.zscPath
            zp = zp.replace('\\','/')
            let ch = lpy.zbCloseHole.replace('{0}','"'+zp+'"')
            app.postLpy(ch)
            app.postLpy(lpy.zbRun)
        }
        // execCodeLocal: app.execCodeLocal
    }
}
</script>