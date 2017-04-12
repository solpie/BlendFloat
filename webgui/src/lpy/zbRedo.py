hwnd = win32gui.FindWindowEx(0, 0, 0, 'ZBrush')
print(hwnd)
#ctrl+shift+z
win32api.PostMessage(hwnd, win32con.WM_KEYDOWN,win32con.VK_CONTROL, 0)  # 
win32api.PostMessage(hwnd, win32con.WM_KEYDOWN,win32con.VK_SHIFT, 0)  # 
win32api.PostMessage(hwnd, win32con.WM_KEYDOWN,	90, 0)  # 
win32api.PostMessage(hwnd, win32con.WM_KEYUP, 	90, 0)
win32api.PostMessage(hwnd, win32con.WM_KEYUP, win32con.VK_SHIFT, 0)
win32api.PostMessage(hwnd, win32con.WM_KEYUP, win32con.VK_CONTROL, 0)