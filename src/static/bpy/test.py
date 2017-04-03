# p = open('print2.py',"r").read()
# # print(p)
# def ex():
#     exec(compile(p, '<string>', 'exec'),globals(),locals())
# ex()


# import win32gui
# def window_enum_handler(hwnd, resultList):
#     title = win32gui.GetWindowText(hwnd)
#     if "Blender" in title:
#         print("find Blender hwnd",hwnd)
#         win32gui.SetForegroundWindow(hwnd)
#     if win32gui.IsWindowVisible(hwnd) and title != '':
#         resultList.append((hwnd, title))

# def get_app_list(handles=[]):
#     mlst=[]
#     win32gui.EnumWindows(window_enum_handler, handles)
#     for handle in handles:
#         mlst.append(handle)
#     return mlst

# appwindows = get_app_list()
# for i in appwindows:
#     print(i)