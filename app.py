from flask import Flask, request, jsonify
import os
from openai import OpenAI
from document_service import DocumentService
from flask_cors import CORS



app = Flask(__name__)
CORS(app) 
client = OpenAI(api_key=os.getenv("GITHUB_TOKEN"), base_url="https://models.inference.ai.azure.com")

doc_service = DocumentService()
conversation_memory = {}

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    filepath = os.path.join("uploads", file.filename)
    os.makedirs("uploads", exist_ok=True)
    file.save(filepath)

    if filepath.endswith(".pdf"):
        doc_service.load_pdf(filepath)
    elif filepath.endswith(".docx"):
        doc_service.load_docx(filepath)
    elif filepath.endswith(".txt"):
        doc_service.load_txt(filepath)
    else:
        return jsonify({"error": "Unsupported file type"}), 400

    return jsonify({"message": f"{file.filename} ingested successfully"})

@app.route("/chat", methods=["POST"])
def chat():
    # Get user input
    user_input = request.json.get("message")
    session_id = request.json.get("session_id", "default")  # default if single-user

    # Initialize memory for this session
    if session_id not in conversation_memory:
        conversation_memory[session_id] = []

    # Search documents for context
    docs = doc_service.search(user_input)
    context = "\n".join([d["text"] for d in docs])

    # Append user message to conversation memory
    conversation_memory[session_id].append({"role": "user", "content": f"{user_input}\n\nContext: {context}"})

    # Build messages to send to the model
    messages = [{"role": "system", "content": "You are a helpful AI assistant with knowledge of uploaded documents."}]
    messages += conversation_memory[session_id]

    # Call OpenAI API
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages
    )

    reply_text = completion.choices[0].message.content

    # Append assistant reply to memory
    conversation_memory[session_id].append({"role": "assistant", "content": reply_text})

    # Return response
    return jsonify({
        "reply": reply_text,
        "documents_used": docs
    })


if __name__ == "__main__":
    app.run(debug=True)
