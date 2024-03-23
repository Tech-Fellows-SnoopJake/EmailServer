import React, { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import axios from "axios"
import { API_URL } from "../../utils/constants";

function getErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return "The request was invalid. Please check your input. CLICK HERE TO DISMISS THIS MESSAGE"
    case 401:
      return "You are not authorized to send this email. CLICK HERE TO DISMISS THIS MESSAGE"
    case 403:
      return "Access is forbidden. Please check your permissions. CLICK HERE TO DISMISS THIS MESSAGE"
    case 404:
      return "The email service was not found. CLICK HERE TO DISMISS THIS MESSAGE"
    case 500:
      return "An internal server error occurred. Please try again later. CLICK HERE TO DISMISS THIS MESSAGE"
    default:
      return "An unknown error occurred. Please try again. CLICK HERE TO DISMISS THIS MESSAGE"
  }
}

const ComposeEmail: React.FC = () => {
  const [receiver, setReceiver] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [message, setMessage] = useState<{
    text: string
    type: "error" | "success"
  } | null>(null)

  // Utility function to show message and fade it out after 5 seconds
  const showMessage = (text: string, type: "error" | "success") => {
    setMessage({ text, type })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  //TODO: fix api
    const apiUrl = `${API_URL}/emails/` //
    const emailData = {
      receiver,
      subject,
      body,
      sender: localStorage.getItem("username"),
      user: localStorage.getItem("id"),
    }

    try {
      const response = await axios.post(apiUrl, emailData, {
        headers: {
          "Content-Type": "application/json",
          //localStorage.getItem("token", data.token);
        },
      })

      // Check for non-2xx status codes
      if (response.status >= 200 && response.status < 300) {
        showMessage("Email sent successfully!", "success")
        // Reset form fields
        setReceiver("")
        setSubject("")
        setBody("")
      } else {
        showMessage(getErrorMessage(response.status), "error")
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // If error has a response property, it's an HTTP error
        showMessage(getErrorMessage(error.response.status), "error")
      } else {
        // Otherwise, it's a network error or other issue
        showMessage(
          "A network error occurred... It's either our server or your internet! Please try again later or check your internet connection.",
          "error"
        )
      }
    }
  }

  return (
    <div className="compose-email p-4 flex flex-col h-full">
      {message && (
        <div
          className={`message p-4 mb-4 rounded-md cursor-pointer ${
            message.type === "success"
              ? "bg-green-100 border border-green-400 text-green-700"
              : "bg-red-100 border border-red-400 text-red-700"
          }`}
          onClick={() => setMessage(null)}
          role="button"
        >
          {message.text}
        </div>
      )}
      <form className="flex flex-col h-5/6" onSubmit={handleSubmit}>
        <input
          type="email"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="mb-4 px-2 h-10  border border-gray-300 rounded"
          placeholder="To"
          required
        />
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mb-4 px-2 h-10 border border-gray-300 rounded"
          placeholder="Subject"
          required
        />
        <ReactQuill
          value={body}
          onChange={setBody}
          className="flex-grow min-h-[200px] max-h-[445px] overflow-y-auto"
          placeholder="Body"
          modules={{
            toolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          }}
        />
        <button
          className="px-4 py-2 bg-[#274073] text-white rounded cursor-pointer hover:bg-[#1a2d50]"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ComposeEmail
