<template>
    <div>
        <el-input placeholder="9527"
                  v-model="port">
            <template slot="prepend">localhost port:
            </template>
        </el-input>
    </div>
</template>
<script>
import app from '../App'

export default {
    data() {
        return app
    },
}
</script>