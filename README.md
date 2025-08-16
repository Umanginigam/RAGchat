# RAG-based AI Chatbot with Document Upload

A **Retrieval-Augmented Generation (RAG) chatbot** that allows users to upload documents and interact with an AI assistant. The chatbot provides answers based on uploaded documents and remembers previous conversation context.

---

## Features

- **Document Upload:** Upload PDF, DOCX, and TXT files via chat interface.  
- **Contextual Chat:** AI answers questions using document content.  
- **Conversation Memory:** Maintains multi-turn conversation context.  
- **Interactive UI:** React + TailwindCSS chat interface with a floating **"+"** upload button.  
- **CORS-enabled:** Frontend can communicate with backend securely.  

---

## Technology Stack

- **Backend:** Python, Flask, OpenAI API  
- **Frontend:** React, TailwindCSS, Axios  
- **Version Control:** Git, Git LFS (for large file support)  

---

## Architecture Overview

```mermaid
flowchart TD
    A[User opens Chat UI] --> B[Clicks "+" to upload document]
    B --> C[Document sent to Flask backend (/upload)]
    C --> D[DocumentService parses & stores content]
    A --> E[User sends chat message]
    E --> F[Flask /chat endpoint receives message]
    F --> G[DocumentService searches relevant context]
    G --> H[Context + conversation memory sent to OpenAI API]
    H --> I[OpenAI returns answer]
    I --> J[Answer sent back to frontend]
    J --> A[Displayed in Chat UI]

