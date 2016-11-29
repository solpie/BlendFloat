def main():
    import bpy

    def copyTransform(src,dst):
        dst.location = src.location
        if hasattr(src,'rotation_axis_angel'):
            dst.rotation_axis_angel = src.rotation_axis_angel
            pass
        if hasattr(src,'rotation_euler'):
            dst.rotation_euler = src.rotation_euler
            pass
        if hasattr(src,'rotation_quaternion'):
            dst.rotation_quaternion = src.rotation_quaternion
            pass
        dst.rotation_mode = src.rotation_mode
        dst.scale = src.scale
        pass

    def joinTarget(mirrorX=False):
        sel_objs = bpy.context.selected_objects
        target = None
        for obj in sel_objs:
            obj.select = False
            if obj.type == 'EMPTY' and 'target' in obj.name:
                print(obj.name)
                target = obj
                continue
                
            mesh = obj.to_mesh(scene = bpy.context.scene, apply_modifiers = True, settings = 'RENDER')
            new_obj = bpy.data.objects.new(obj.name,mesh)
            ##add to scene
            scn = bpy.context.scene
            scn.objects.link(new_obj)
            if scn.objects.active == obj:
                scn.objects.active = new_obj
            new_obj.select = True
            ##set transform
            copyTransform(obj,new_obj)
                
        bpy.ops.object.join()

        ## merge obj to target
        copyTransform(target,bpy.context.active_object)
        
        ## mirror x
        if mirrorX:
            bpy.context.object.scale[0] = -bpy.context.object.scale[0]
            bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
            bpy.ops.object.editmode_toggle()
            bpy.ops.mesh.select_all(action="SELECT")
            bpy.ops.mesh.flip_normals()
            bpy.ops.object.editmode_toggle()
            pass
        pass
    joinTarget(False)
main()