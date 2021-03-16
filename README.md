# autoDJ
## Running
For running the app, you first have to start the final server and then run the webapp (which sends requests to the python server).
### Start the python server
```shell
cd pythonServer
mkdir completePlaylists
python3 -m venv venv
pip3 install -r requirments.txt
python3 server.py
```
### Run the webapp
The python server should be running when starting the webapp.
```shell
cd webApp
mkdir uploads
mkdir public/songs
npm install
npm install connect-multiparty
npm install python-shell
node index.js
```
### Using
Visit `localhost:3000` in your browser to use the application. If the mixing takes too long, check your terminal windows for potential errors. 