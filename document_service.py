# document_service.py
import os
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from pypdf import PdfReader
from docx import Document

class DocumentService:
    def __init__(self, index_path="vector_index.faiss"):
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.index_path = index_path
        self.dimension = 384  # Embedding size
        self.index = faiss.IndexFlatL2(self.dimension)

        # If index already exists, load it
        if os.path.exists(index_path):
            self.index = faiss.read_index(index_path)

        self.documents = []  # store text chunks

    def embed_text(self, text):
        return self.model.encode([text])[0]

    def add_document(self, text, metadata=""):
        embedding = self.embed_text(text).astype("float32")
        self.index.add(np.array([embedding]))
        self.documents.append({"text": text, "metadata": metadata})

        # Save index
        faiss.write_index(self.index, self.index_path)

    def search(self, query, top_k=3):
        query_vec = self.embed_text(query).astype("float32").reshape(1, -1)
        distances, indices = self.index.search(query_vec, top_k)
        results = [self.documents[i] for i in indices[0] if i < len(self.documents)]
        return results

    def load_pdf(self, filepath):
        reader = PdfReader(filepath)
        for page in reader.pages:
            self.add_document(page.extract_text(), metadata=filepath)

    def load_docx(self, filepath):
        doc = Document(filepath)
        for para in doc.paragraphs:
            if para.text.strip():
                self.add_document(para.text, metadata=filepath)

    def load_txt(self, filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    self.add_document(line.strip(), metadata=filepath)
