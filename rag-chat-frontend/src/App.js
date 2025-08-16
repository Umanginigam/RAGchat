import React, { useState } from "react";
import { Upload } from "lucide-react";
import Chat from "./components/Chat";
import FileUploadModal from "./components/FileUpload";

function App() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto h-screen max-h-[800px] flex flex-col">
        {/* Main chat container */}
        <div className="flex-1 relative">
          <Chat onFileUploadClick={() => setShowUpload(true)} />
          
          {/* Floating upload button */}
          <button
            onClick={() => setShowUpload(true)}
            className="absolute -bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 group"
            title="Upload file"
          >
            <Upload size={24} className="group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-ping opacity-20"></div>
          </button>
        </div>
      </div>

      {/* Upload modal */}
      {showUpload && <FileUploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
}

export default App;