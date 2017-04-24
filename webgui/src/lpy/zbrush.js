exports.lpy = {
    'zbUndo.py': `
hwnd = win32gui.FindWindowEx(0, 0, 0, 'ZBrush')
win32api.PostMessage(hwnd, win32con.WM_KEYDOWN,win32con.VK_CONTROL, 0)
win32api.PostMessage(hwnd, win32con.WM_KEYDOWN,	90, 0)
win32api.PostMessage(hwnd, win32con.WM_KEYUP,90, 0)
win32api.PostMessage(hwnd, win32con.WM_KEYUP, win32con.VK_CONTROL, 0)
`,
    // ctrl+shift+z
    'zbRedo.py': `
hwnd = win32gui.FindWindowEx(0, 0, 0, 'ZBrush')
win32api.PostMessage(hwnd, win32con.WM_KEYDOWN,win32con.VK_CONTROL, 0)  # 
win32api.PostMessage(hwnd, win32con.WM_KEYDOWN,win32con.VK_SHIFT, 0)  # 
win32api.PostMessage(hwnd, win32con.WM_KEYDOWN,	90, 0)  # 
win32api.PostMessage(hwnd, win32con.WM_KEYUP, 	90, 0)
win32api.PostMessage(hwnd, win32con.WM_KEYUP, win32con.VK_SHIFT, 0)
win32api.PostMessage(hwnd, win32con.WM_KEYUP, win32con.VK_CONTROL, 0)
`,
    'zbFocus.py': `
hwnd = win32gui.FindWindowEx(0, 0, 0, 'ZBrush')
win32api.PostMessage(hwnd, win32con.WM_KEYDOWN,		70, 0)  # 
win32api.PostMessage(hwnd, win32con.WM_KEYUP, 		70, 0)
`,
    'zbCloseHole': `
s = "[Loop,1,[IPress,Tool:Geometry:Close Holes]]"
defzsc = os.path.join({0}, "DefaultZScript.txt")
f = open(defzsc, 'w')
f.write(s)
f.close()
`,
    'zbRun': `
hwnd = win32gui.FindWindowEx(0, 0, 0, 'ZBrush')
win32api.PostMessage(hwnd, win32con.WM_KEYDOWN,win32con.VK_MULTIPLY, 0)
win32api.PostMessage(hwnd, win32con.WM_KEYUP, win32con.VK_MULTIPLY, 0)
`
}
exports.bpy = {
    'gob.py': `
def main():
    import bpy
    bpy.ops.scene.gob_export()
main()
    `
}
module.exports = exports;