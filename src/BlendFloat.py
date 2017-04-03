import os
# print(os.path.realpath(__file__))
# server_path = os.path.realpath(__file__)
serverConf = {"port": 80, "path": '.',
              "views": [], "reqHeaders": [], "resHeaders": []}

serverConf["path"] = os.path.dirname(__file__)
if serverConf["path"] == "":
    serverConf["path"] = os.path.realpath(".")
print("server root:", serverConf["path"])
# config
import configparser

config = configparser.RawConfigParser()

def loadConf():
    config.read(os.path.join(serverConf["path"], '.cfg'))
    serverConf["port"] = config.get('server', 'port')
    serverConf["views"] = config.get('server', 'views')
    serverConf["reqHeaders"] = config.get('server', 'reqHeaders').split(",")
    serverConf["resHeaders"] = config.get('server', 'resHeaders').split(",")
    print("serverConf:", serverConf)

loadConf()
# set Blender Foreground
import win32gui
def window_enum_handler(hwnd, resultList):
    title = win32gui.GetWindowText(hwnd)
    if "Blender" in title:
        print("find Blender hwnd",hwnd)
        win32gui.SetForegroundWindow(hwnd)

def setBlenderForeground():
    win32gui.EnumWindows(window_enum_handler,[])
# exec Info
class ExecInfo(object):
    def __init__(self, *args):
        super(ExecInfo, self).__init__(*args)
        self.code = "import bpy;bpy.ops.object.select_all()"

    def push(self,code):
        self.code = code

    def pop(self):
        c = self.code
        self.code = ""
        return c

execInfo = ExecInfo()
# web server
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
from engineio import async_eventlet
async_mode ="eventlet"

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)

@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

@app.route('/exec',methods=['GET'])
def getExecBpy():
    bpy = execInfo.pop()
    # if bpy !="":
    #     setBlenderForeground()
    return bpy
    
@app.route('/exec',methods=['POST'])
def pushExecBpy():
    bpy = request.values.get('bpy', 0) 
    execInfo.push(bpy)
    return "ok"
    
if __name__ == '__main__':
    socketio.run(app,port=int(serverConf["port"]), debug=True)