

from bs4 import BeautifulSoup
import requests
from config import app, db
from models import User
import googlesearch
from flask import Flask, request, jsonify
import pdfplumber
import google.generativeai as genai
import os


class AIChatbot:
    def __init__(self, api_key):
        self.api_key = api_key
        self.global_pdf = None
        self.model = self._initialize_model()
        self.first_question = True  # Flag to indicate if it's the first question

    def _initialize_model(self):
        genai.configure(api_key=self.api_key)
        generation_config = {
            "temperature": 0.9,
            "top_p": 1,
            "top_k": 1,
            "max_output_tokens": 2048,
        }
        safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        ]
        return genai.GenerativeModel(
            model_name="gemini-1.0-pro",
            generation_config=generation_config,
            safety_settings=safety_settings
        )

    def upload_and_train(self, file):
        if file:
            pdf_text = self._process_uploaded_pdf(file)
            self.global_pdf = pdf_text
            return {"message": 'PDF uploaded and AI model trained successfully!'}, 201
        return {"message": 'Invalid request'}, 404

    def _process_uploaded_pdf(self, file):
        try:
            text = ""
            with pdfplumber.open(file) as pdf:
                for page in pdf.pages:
                    text += page.extract_text()
            return text
        except Exception as e:
            print("Error processing PDF:", e)
            return None

    def ask_question(self, question):
        try:
            if self.global_pdf is None:
                return {"error": "PDF not uploaded or processed."}, 400
            
            if self.first_question:
                convo = self.model.start_chat(history=[])
                self.first_question = False
            
            convo.send_message(self.global_pdf)
            convo.send_message(question)
            answer = convo.last.text
            os.system("cls")
            return {"answer": answer}, 200
        except Exception as e:
            return {"error": str(e)}, 400
    def search_internet(self, question):
        try:
            search_results = googlesearch.search(question, num=1, stop=1)
            link = next(search_results, None)
            if link:
                return {"link": link}, 200
            else:
                return {"error": "No relevant links found for the question."}, 404
        except Exception as e:
            return {"error": str(e)}, 400

    def summarize_pdf(self):
        try:
            if self.global_pdf is None:
                return {"error": "PDF not uploaded or processed."}, 400
            
            convo = self.model.start_chat(history=[])
            convo.send_message(self.global_pdf)
            convo.send_message("summarize")
            summary = convo.last.text
            os.system("cls")
            return {"summarized": summary}, 200
        except Exception as e:
            return {"error": str(e)}, 400

chatbot = AIChatbot(api_key="API KEY")


@app.route('/upload-and-train', methods=['POST'])
def upload_and_train():
    file = request.files.get('file')
    if not file:
        return {"message": 'No file uploaded'}, 400
    return chatbot.upload_and_train(file)

@app.route("/ask", methods=["POST"])
def ask_question():
    try:
        question = request.json.get("question")
        if not question:
            return {"error": "Question not provided"}, 400

        answer = chatbot.ask_question(question)
        link = chatbot.search_internet(question)
        print(answer, link)
        return jsonify({"answer": answer, "link": link}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route("/summarize", methods=["POST"])
def pdf_summary():
    summary = chatbot.summarize_pdf()
    print(summary)
    return jsonify(summary), 200

if __name__ == "__main__":
    app.run(debug=True)


