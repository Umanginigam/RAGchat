# 🚀 RAG-based AI Chatbot with Document Upload

A **Retrieval-Augmented Generation (RAG) chatbot** that lets users upload documents and interact with an AI assistant. The chatbot provides answers based on uploaded documents and remembers previous conversation context.

---

## 🌟 Features

- **📄 Document Upload:** Upload PDF, DOCX, and TXT files via chat interface.  
- **💬 Contextual Chat:** AI answers questions using document content.  
- **🧠 Conversation Memory:** Maintains multi-turn conversation context.  
- **🖥️ Interactive UI:** React + TailwindCSS chat interface with a floating **"+"** upload button.  
- **🔗 CORS-enabled:** Frontend communicates with backend securely.  

---

## 🛠️ Technology Stack

- **Backend:** Python, Flask, OpenAI API  
- **Frontend:** React, TailwindCSS, Axios  
- **Version Control:** Git, Git LFS (for large file support)  

---

## 🏗️ Architecture Overview

<img width="1364" height="731" alt="enhanced_rag_chatbot_flowchart" src="https://github.com/user-attachments/assets/452199ec-09f4-4414-8872-050029e50c5d" />


> The flowchart visualizes the complete workflow from document upload to AI response.

---

## ⚡ Setup and Installation

### Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/Umanginigam/RAGchat.git
cd flask-ai-agent

# 2. Create a Python virtual environment
python3 -m venv venv

# 3. Activate the virtual environment
source venv/bin/activate

# 4. Install Python dependencies
pip install -r requirements.txt

# 5. Set your OpenAI API key
export GITHUB_TOKEN="your_openai_api_key_here"

# 6. Start the Flask backend server
python app.py

# Backend runs at http://127.0.0.1:5000
```
### Frontend Setup
```bash
# 1. Navigate to the frontend folder
cd rag-chat-frontend

# 2. Install frontend dependencies
npm install

# 3. Start the React development server
npm start

# Frontend runs at http://localhost:3000
```
### 🎬 Features Demonstration
1. Open the chat UI in browser.  
2. Click **"+"** to upload documents (PDF, DOCX, TXT).  
3. Type a message and send.  
4. Chatbot responds with answers based on uploaded documents and conversation history.  
5. Multi-turn chat is supported for maintaining context.  

---

## Notes

- Supported document formats: PDF, DOCX, TXT.  
- Session-based conversation memory allows continuous chat.  
- For large files, consider using Git LFS for version control.  

---

## License

MIT License
