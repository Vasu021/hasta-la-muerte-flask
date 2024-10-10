from flask import Flask, json, render_template, request, jsonify
from flask_cors import CORS  # Ensure to install flask-cors

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/saveMessage', methods=['POST'])
def saveMessage():
    try:
        # Decode the byte string to a regular string
        data = request.data.decode('utf-8')
        # Convert the JSON string to a Python dictionary
        data_dict = json.loads(data)
        
        msg = data_dict.get('userMessage')  # Use .get() for safer access
        time = data_dict.get('dateAndTime')
        
        if not msg or not time:
            return jsonify({'error': 'Missing userMessage or dateAndTime'}), 400

        dataToSave = f"{time} - {msg}"
        print(dataToSave)

        # Save dataToSave to the first line of response.txt
        try:
            with open('response.txt', 'r+') as file:
                existing_content = file.read()
                file.seek(0)
                file.write(dataToSave + "\n\n\n")
                file.write(existing_content)
        except IOError as e:
            print(f"File I/O error: {e}")
            return jsonify({'error': 'Failed to save message to file'}), 500
        
        return jsonify({'status': 'success', 'data': dataToSave}), 200

    except json.JSONDecodeError:
        return jsonify({'error': 'Invalid JSON format'}), 400
    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
