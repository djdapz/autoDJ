import subprocess

def main():
	a = 'testString'
	x = subprocess.call(['python', 'test.py', a])
	print x
main()