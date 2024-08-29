import React, { useState, useRef } from "react"
import { Box, Button, TextField, CircularProgress } from "@mui/material"
import DocumentCard from "./DocumentCard"
import UploadMaterials from "../api/courses/UploadMaterials"

const CourseMaterials = ({ documents, courseId, role, onDocumentsChange }) => {
  const [documentTitle, setDocumentTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef(null)
  console.log(courseId)
  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      handleUploadMaterial(file)
    }
  }

  const handleUploadMaterial = async (file) => {
    if (!documentTitle.trim()) {
      alert("Please enter a title for the document.")
      return
    }

    setIsLoading(true)
    try {
      const result = await UploadMaterials(file, courseId, documentTitle)
      if (result && result.success) {
        onDocumentsChange()
        setDocumentTitle("")
      }
    } catch (error) {
      console.error("Error!", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ mt: 2 }}>
      {documents && documents.length > 0 ? (
        documents.map((doc) => (
          <DocumentCard
            key={doc.publicId}
            title={doc.title || ""}
            link={doc.documentUrl}
          />
        ))
      ) : (
        <p>No documents available.</p> // Display a message when there are no documents
      )}

      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        {role === "TEACHER" && (
          <>
            <TextField
              label="Document Title"
              variant="outlined"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={handleButtonClick}
              disabled={isLoading || !documentTitle.trim()}
            >
              {isLoading ? <CircularProgress size={24} /> : "Upload Material"}
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default CourseMaterials
