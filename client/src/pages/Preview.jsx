import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ResumePreview from '../components/ResumePreview'
import { ArrowLeftIcon, Loader } from 'lucide-react'
import api from '../configs/api'

const Preview = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadResume = async () => {
    try {
      const { data } = await api.get(`/api/resumes/public/${resumeId}`)
      // server returns { resume: { ... } } inside the ApiResponse wrapper
      const resume = data?.resume ? data.resume : data
      setResumeData(resume)
    } catch (err) {
      console.error(err)
      setError('Resume not found')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResume()
  }, [resumeId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin w-10 h-10 text-gray-500" />
      </div>
    )
  }

  if (!resumeData || error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100">
        <p className="text-center text-4xl text-slate-400 font-medium">{error || 'Resume not found'}</p>
        <Link
          to="/"
          className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-10 flex items-center gap-2 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" /> Go to Home Page
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-3xl mx-auto bg-white py-4 rounded-lg shadow-sm">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  )
}

export default Preview
