import React from 'react'
import './css/doc-upload.css'
export default function DocumentUpload() {
  return (
    <div className='doc-upload'>
      <div className='upload-header'>
      <h2>Document Upload</h2>
      <button className="btn btn-primary" style={{ marginLeft: 12 }}>Upload</button>
      
      </div>
      <div className='upload-box'>
        <div>
        <h5>Drag & Drop Documents Here</h5>
        <h6>Or click to browse files</h6>
        </div>
        <input type="file" id="file-input" multiple accept=".pdf,.jpg,.jpeg,.png" hidden />
        <button class="upload-btn" id="browse-files">Browse Files</button>
      </div>
      <div className="recent">
        <h2>Recent Activities</h2>
      </div>
    </div>
  )
}
