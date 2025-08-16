import React, { useState, useRef } from "react";
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

const FileUploadModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first");
      setUploadStatus("error");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setMessage(res.data.message || `File "${file.name}" uploaded successfully!`);
      setUploadStatus("success");
      
      // Auto-close after successful upload
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Please try again.");
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage("");
    setUploadStatus(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setMessage("");
      setUploadStatus(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black/40 via-purple-900/20 to-black/40 backdrop-blur-md flex justify-center items-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden border border-white/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 pb-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Upload Document</h2>
              <p className="text-blue-100 text-sm">Share files for analysis</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 -mt-4">
          <div 
            className="bg-white rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.csv,.xlsx,.xls"
            />
            
            <div 
              onClick={triggerFileInput}
              className="p-8 text-center cursor-pointer"
            >
              <div className="mb-4">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Upload size={32} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {file ? file.name : "Choose a file"}
                </h3>
                <p className="text-slate-500 text-sm">
                  Click to browse or drag and drop
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  PDF, DOC, TXT, Images, CSV, Excel supported
                </p>
                {file && (
                  <p className="text-blue-600 text-xs mt-2 font-medium">
                    Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Status message */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
              uploadStatus === "success" ? "bg-green-50 text-green-700 border border-green-200" :
              uploadStatus === "error" ? "bg-red-50 text-red-700 border border-red-200" :
              "bg-blue-50 text-blue-700 border border-blue-200"
            }`}>
              {uploadStatus === "success" && <CheckCircle size={16} />}
              {uploadStatus === "error" && <AlertCircle size={16} />}
              <p className="text-sm">{message}</p>
            </div>
          )}

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {isUploading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Uploading...
              </div>
            ) : (
              "Upload File"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadModal;