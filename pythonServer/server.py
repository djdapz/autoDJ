from os import listdir
import subprocess
import json
import time
import logging
import sys
from flask import Flask
app = Flask(__name__)



#PYTHON SERVER API
#one endpoint
#/process/<playlist_id>
def processSong(playlist_id):
	subprocess.call(['python', 'beatmatch.py', playlist_id])
	return 1

@app.route('/')
def hello_world():
	
	return 'Hello World!'


@app.route('/process/<playlist_id>', methods=['GET'])
def processRoute(playlist_id):    
	x = processSong(playlist_id)

	print('done processing, now converting')


	directoryDestinationNameWAV = "completePlaylists/" + playlist_id + ".wav"
	directoryDestinationNameMP3 = "completePlaylists/" + playlist_id + ".mp3"

	subprocess.call(["rm", directoryDestinationNameMP3])
	subprocess.call(["ffmpeg", "-i", directoryDestinationNameWAV,  "-ab", "128k",  directoryDestinationNameMP3])
	subprocess.call(["rm", directoryDestinationNameWAV])
	return 'we did it'


#runs on localhost 5000
if __name__ == '__main__':
    app.run()



