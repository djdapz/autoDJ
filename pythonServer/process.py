import numpy as np
import scipy as sp
import matplotlib.pyplot as plt
import librosa
from os import listdir
import sys

def main():
	playlist_id = sys.argv[1]
	directorySourceName = "../webApp/uploads/" + playlist_id

	files = listdir(directorySourceName)
	playlist = np.zeros(0);


	if len(files) > 3:
		for n in range(3):
			thisSong, sr = librosa.core.load(directorySourceName+"/" + files[n] , sr=44100)
			playlist = np.append(playlist, thisSong)
	else:
		for n in range(len(files)):
			thisSong, sr = librosa.core.load(directorySourceName+"/" + files[n] , sr=44100)
			playlist = np.append(playlist, thisSong)

	directoryDestinationName = "completePlaylists/" + playlist_id + ".wav"
	librosa.output.write_wav(directoryDestinationName, playlist, 44100)	




	

	print('we got here')

main()
