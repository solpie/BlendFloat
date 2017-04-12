hwnd = win32gui.FindWindowEx(0, 0, 0, 'ZBrush')
win32api.PostMessage(hwnd, win32con.WM_KEYDOWN,		70, 0)  # 
win32api.PostMessage(hwnd, win32con.WM_KEYUP, 		70, 0)