from flask import Flask, request, jsonify,redirect,url_for,Blueprint
from flask_cors import CORS
import sqlite3
import pandas as pd 
from .Agent.agent import agent
import markdown

app = Flask(__name__)
CORS(app)

local_file= "travel2.sqlite"
backup_file= "travel2.backup.sqlite"

id="0"
condition=True
@app.route('/check_id', methods=['GET'])
def check_id():
    # Connect Database 
    conn = sqlite3.connect(local_file)
    cursor = conn.cursor()
    cursor.execute("SELECT passenger_id FROM tickets;")
    passenger_ids= cursor.fetchall()
    ids=[row[0] for row in passenger_ids]
    id_to_check = request.args.get("id") 
    # Check the entered passenger_id 
    if not id_to_check:
        return jsonify({"error":"No ID provided"})
    if id_to_check in ids: 
        global id
        id = id_to_check
        return jsonify ({"status":"exist"})
    else: 
        return jsonify({"status":"not exist"})
    

@app.route("/process_message", methods=["POST"])
def process_message():
        try:
            data = request.get_json()
            user_message = data.get("message", "").strip()
            if not user_message: # check if the user entered a message
                return jsonify({"result": "Please send a valid message."}), 400

            chatbot_response = agent(id,user_message)       

            return jsonify({"result":chatbot_response})
        except Exception as e:
            return jsonify({"error": "An unexpected error occurred."}), 500


if __name__ == '__main__':
    app.run(debug=True)

# authentic function 
# def process_message():
#    
#    try:
#        data = request.get_json()
#        user_message = data.get("message", "").strip()
#        if not user_message: # check if the user entered a message
#            return jsonify({"result": "Please send a valid message."}), 400
#        
#        chatbot_response = agent(id,user_message)       
#        
#        return jsonify({"result":chatbot_response})
#    except Exception as e:
#        return jsonify({"error": "An unexpected error occurred."}), 500