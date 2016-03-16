from __future__ import division
from os import listdir
from librosa.core import load
from librosa.beat import beat_track
from scipy.fftpack import fft
from scipy.signal import hann


import numpy as np
import scipy as sp
import matplotlib.pyplot as plt
import librosa
import sys
import cmath,math
import os


def fade(X, type, start=None, end=None):
    """
    Takes a 1-D array audio signal X as input and applies an amplitude fade to the signal. Type
    indicates whether it is a fade-in or a fade-out, and start and end indicate the index
    number of the sample that the fade starts or ends on respectively. If nothing is entered
    for start or end, it will start or end at the first or last sample respectively. Otherwise,
    the fade will ocur within the start and end index numbers.
    
    Input Parameters
    ----------------
    X: a 2-D numpy array of real numbers, where the ith value is the ith sample in the audio signal
        
    type: "in" if the fade starts from 0 and progresses to full amplitude and "out" if the fade
    starts from full amplitude and progresses to 0
    
    start: indicates the index that the fade will begin on. If left blank, index number 0 will
    be chosen
    
    end: indicates the index that the fade will end on. If left blank, the last sample of the
    signal will be chosen.
        
    Returns
    -------
    a 1-D numpy array of real values representing the faded output signal
    """
    
    sig_length = len(X)
    
    Y = np.array(X, dtype='f')
    
    if (start==None):
        start = 0
    if (start < 0):
        start = 0
    
    if (end==None):
        end = sig_length - 1 

    if (end >= sig_length):
        end = sig_length - 1

    if (start > end):
    	temp = end
    	end = start
    	start = temp
        
    fade_length = 1 + end - start

    fade = np.arange(0,fade_length)

    if (type == "in"):
    	print("filtering in")
    	print('start')
        print(start)
        print('end')
        print(end)

        fade_in = np.sqrt(fade/(fade_length-1))

        #fade_in = fade/(fade_length-1)
        Y[int(start):int((end+1))] = X[int(start):int((end+1))]*fade_in
        
    if (type == "out"):
    	print("filtering out")
        fade_out = np.sqrt(1 - fade/(fade_length-1))
        print("len fade out")
        print(len(fade_out))
        fade_out = 1 - fade/(fade_length-1)
        Y[int(start):int((end+1))] = X[int(start):int((end+1))]*fade_out
    
    return np.asarray(Y)

# s = fade(one, type = "out")

# plt.plot(s)




def beat_match(song1, song2, sr):
    """
    Creates two lists of length equal to the combined length of both songs. The first list is zero padded from the
    end of the first song until the end of the second song. The second list is zero padded from the beginning of the
    first song until the first beat of the last phrase of that same song. The second song is then appended to the second
    list. The lists are then added together.
    
    Input Parameters
    ------------------------
    
    song1: 1-D array containing sample points of first song
    
    song2: 1-D array containing sample points for second song
    
    sr: integer representing the rate at which the song is being sampled
    
    
    Returns
    ------------------------
    
    a 1-D array containing a syncronized mixture of both songs
    """
    print('begin beatmatch')
    
    tempo1, beat1 = beat_track(song1)
    tempo2, beat2 = beat_track(song2)
    
    beat1 = librosa.frames_to_samples(beat1)
    beat2 = librosa.frames_to_samples(beat2)
    
    song2 = song2[beat2[0]:]
    
    phrases1 = len(beat1)
    fade_start = phrases1 - 32

    fade_sample = beat1[fade_start]
    fade_out_start = fade_sample
    fade_out_end = len(song2)
    

    phrases2 = len(beat2)
    fade_in_start = len(song1[:fade_sample])
    fade_in_end = fade_in_start + phrases2
    
    song2 = fade(song2, type = "in", end = beat2[32])
    zeros2 = np.zeros(len(song1[:fade_sample]), dtype = np.float32)
    list2 = np.append(zeros2, song2)
    #list2 = fade(list2, type= "in", start = fade_in_start, end = fade_in_end)
    
    song1 = fade(song1, type = "out", start = fade_out_start)
    zeros1 = np.zeros((len(song2)-len(song1[fade_sample:])), dtype = np.float32)
    list1 = np.append(song1, zeros1)
    #list1 = fade(list1, type= "out", start = fade_out_start, end = fade_out_end)
    
    mix = list1 + list2
    print('end beatmatch')
    return mix



def mix_maker(playlist, rootDir):
    """
    Creates a seamless mix of all the songs in a playlist. Songs crossfade into one another. The function assumes
    similar BPM and a sample rate of 44100 Hz.
    
    Input Parameters
    ------------------------
    
    playlist: list of paths to files containing songs for analysis and mixing. 
    
    
    Returns
    ------------------------
    
    a continuous mix of all songs as one audiofile. 
    """

 
    #sample_list = np.zeros(len(playlist), dtype = object)
    #mix = []
    if '.mp3' in playlist[0]:
    	print(1)
    else:
    	playlist = playlist[1:]
    playlist_length = len(playlist)
    print('iteration 0:')

    samples, sr = load(rootDir+"/" +playlist[0], 44100)
    mix = samples
    playlist = playlist[1:]
    playlist_length = len(playlist)

    x = 0
    while playlist_length > 0:
    	print("iteration: ")
    	x = x+1
    	print(x)
    	print('playlist_length')
    	print(len(playlist))
        samples, sr = load(rootDir+"/" +playlist[0],44100)
        mix = beat_match(mix, samples, sr)
        playlist = playlist[1:]
        playlist_length = len(playlist)
        
    
    return mix


def main():

	#get a list of the songs
	playlist_id = sys.argv[1]
	directorySourceName = "../webApp/uploads/" + playlist_id
	files = listdir(directorySourceName)

	#call the DJ
	playlist = mix_maker(files, directorySourceName)
	print('mix made')

	directoryDestinationName = "completePlaylists/" + playlist_id + ".wav"
	#directoryDestinationName = "completePlaylists/" + playlist_id + ".wav"
	print('saving to ' + directoryDestinationName)
	#save file
	librosa.output.write_wav(directoryDestinationName, playlist, 44100)	

	print('we got here')
main()
