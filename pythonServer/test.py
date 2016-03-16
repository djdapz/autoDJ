from os import listdir
from librosa.core import load
from librosa.beat import beat_track
from scipy.fftpack import fft
from scipy.signal import hann
#from __future__ import division

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


def main():
	samples, sr = load(rootDir+"/" +playlist[0], 44100)
	song2 = fade(sample, type = "in", end = beat2[32])
