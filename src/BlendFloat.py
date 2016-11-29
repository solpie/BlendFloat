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
#
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
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = "eventlet"

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)
thread = None


def background_thread():
    """Example of how to send server generated events to clients."""
    count = 0
    while True:
        socketio.sleep(10)
        count += 1
        socketio.emit('my_response',
                      {'data': 'Server generated event', 'count': count},
                      namespace='/test')


@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

@app.route('/exec',methods=['GET'])
def getExecBpy():
    bpy = execInfo.pop()
    if bpy !="":
        setBlenderForeground()
    return bpy
    
@app.route('/exec',methods=['POST'])
def pushExecBpy():
    bpy = request.values.get('bpy', 0) 
    execInfo.push(bpy)
    return "ok"

@socketio.on('my_event', namespace='/test')
def test_message(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']})


@socketio.on('my_broadcast_event', namespace='/test')
def test_broadcast_message(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']},
         broadcast=True)


@socketio.on('disconnect_request', namespace='/test')
def disconnect_request():
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': 'Disconnected!', 'count': session['receive_count']})
    disconnect()

@socketio.on('connect', namespace='/test')
def test_connect():
    global thread
    if thread is None:
        thread = socketio.start_background_task(target=background_thread)
    emit('my_response', {'data': 'Connected', 'count': 0})


@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected', request.sid)


if __name__ == '__main__':
    socketio.run(app,port=int(serverConf["port"]), debug=True)
# from bottle import Bottle, static_file, request, template, TEMPLATE_PATH, HTTPResponse
# TEMPLATE_PATH.append(os.path.join(serverConf["path"], 'views'))
# app = Bottle()
# get = app.get
# post = app.post
# route = app.route


# @route("/exec")
# def execCode():
#     # return "print('running')"
#     return execInfo.pop()

# # views
# @get('/<view_name>')
# @get('/<view_name>/')
# def views_tpl(view_name):
#     print("views:", view_name)
#     if view_name not in serverConf["views"]:
#         return "can not find view[{0}] in server.cfg".format(view_name)
#     else:
#         return template(view_name, request.query)

# # static
# static_path = os.path.join(serverConf["path"], 'static')
# print("static path:", static_path)


# @get('/static/<filepath:path>')
# def server_static(filepath):
#     print(filepath)
#     return static_file(filepath, root=static_path)


# app.run(host='0.0.0.0', debug=True,port=serverConf["port"], reloader=True)

