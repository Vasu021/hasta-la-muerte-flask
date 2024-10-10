# save this as app.py
from flask import Flask, json, render_template, request
from flask_cors import CORS #pip install flask-cors


app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/saveMessage', methods=['POST'])
def saveMessage():
    data = request.data.decode('utf-8')  # Decode the byte string to a regular string
    data_dict = json.loads(data)  # Convert the JSON string to a Python dictionary
    #print(data_dict)
    msg = data_dict['userMessage']
    time = data_dict['dateAndTime']
    dataToSave = time + " - " + msg
    print(dataToSave)
    # Save dataToSave to the first line of response.txt
    with open('response.txt', 'r+') as file:
        existing_content = file.read()
        file.seek(0)
        file.write(dataToSave + "\n\n\n")
        file.write(existing_content)
    return dataToSave


if __name__=="__main__":
    app.run(host='0.0.0.0', port=8080)