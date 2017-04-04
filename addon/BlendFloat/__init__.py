# -*- coding: utf-8 -*-
__author__ = 'SolPie'
import bpy

bl_info = {
    "name": "BlendFloat",
    "author": "SolPie",
    "version": (1, 1),
    "blender": (2, 7, 8),
    "location": "localhost 9527",
    "description": "Blender Float call from external app",
    "warning": "",
    "category": "Misc"}

from bpy.props import StringProperty, IntProperty, BoolProperty

# Addon prefs
class BlendFloatPrefs(bpy.types.AddonPreferences):
    bl_idname = __name__
    port = IntProperty(
        name="web server port",
        default=9527,
    )

    def draw(self, context):
        layout = self.layout
        row = layout.row()
        row.prop(self, "port")
        # self.checkEnable(context)
####################################
class BlendCall(bpy.types.Operator):
    bl_idname = "blendfloat.call"
    bl_label = "run.BlendCall"
    def execute(self, context):
        user_preferences = context.user_preferences
        addon_prefs = user_preferences.addons[__name__].preferences
        server_port = addon_prefs.port
        try:
            from urllib.request import urlopen
            code = urlopen("http://localhost:"+str(server_port) +"/exec", timeout=1).read()
            if code:
                exec(compile(code, '<string>', 'exec'))
        except Exception as e:
            print('stop BlendCall',e)
        return {'PASS_THROUGH'}
# store keymaps here to access after registration
addon_keymaps = []

###########
def register():
    bpy.utils.register_class(BlendFloatPrefs)
    bpy.utils.register_class(BlendCall)
    # handle the keymap
    wm = bpy.context.window_manager
    km = wm.keyconfigs.addon.keymaps.new(name = "Window", space_type = "EMPTY")
    kmi = km.keymap_items.new(BlendCall.bl_idname, 'F5', 'PRESS')
    kmi.properties.name = "BlendFloat_call"
    addon_keymaps.append((km, kmi))

def unregister():
    bpy.utils.unregister_class(BlendFloatPrefs)
    bpy.utils.unregister_class(BlendCall)
    # handle the keymap
    for km, kmi in addon_keymaps:
        km.keymap_items.remove(kmi)
    addon_keymaps.clear()