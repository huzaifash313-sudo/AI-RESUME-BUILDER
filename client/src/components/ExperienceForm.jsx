import { Briefcase, Loader2, Plus, Sparkle, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../configs/api";
const ExperienceForm = ({ data = [], onChange }) => {

  const { token } = useSelector(state => state.auth)

  const [generatingIndex, setGeneratingIndex] = useState(-1)
  
  // Local AI enhancement: works without server dependency
  const enhanceDescriptionLocally = (position, company, description) => {
    if (!position && !company) return description;
    
    const actionVerbs = [
      'Led', 'Managed', 'Designed', 'Developed', 'Implemented', 'Improved',
      'Optimized', 'Automated', 'Built', 'Created', 'Established', 'Spearheaded',
      'Collaborated', 'Coordinated', 'Executed', 'Delivered', 'Achieved', 'Increased'
    ];
    
    const metrics = [
      'increased efficiency', 'improved performance', 'reduced costs',
      'enhanced user experience', 'streamlined processes', 'boosted productivity',
      'optimized workflow', 'achieved targets', 'delivered results', 'exceeded goals'
    ];
    
    const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
    const metric = metrics[Math.floor(Math.random() * metrics.length)];
    const existingContent = description ? description.trim().split('.')[0] : '';
    
    return `${verb} ${position}${company ? ` at ${company}` : ''} — ${existingContent || 'Responsible for key initiatives'}. Focused on ${metric} through strategic implementation and collaboration.`;
  }
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  const generateDescription = async (index) => {
    setGeneratingIndex(index)
    const experience = data[index]
    const prompt = `enhance this job description "${experience.description}" for the position of ${experience.position} at ${experience.company}`

    try {
      console.log('Sending enhance request:', { userContent: prompt })
      const response = await api.post('/api/ai/enhance-job-description', { userContent: prompt }, { headers: { Authorization: token } })
      console.log('Full response object:', response)
      console.log('Response data:', response.data)
      
      // Handle both wrapped and unwrapped responses
      const enhanced = response.data?.enhancedContent || response.data
      if (enhanced && typeof enhanced === 'string') {
        updateExperience(index, "description", enhanced)
        toast.success('Description enhanced successfully!')
      } else {
        throw new Error('No enhanced content in response')
      }
    } catch (error) {
      console.error('Enhance error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        fullError: error
      })
      toast.error(error?.response?.data?.message || error.message || 'Enhancement failed')
    }
    finally {
      setGeneratingIndex(-1)
    }
  }
  // Local enhancement fallback: produce a concise action-oriented description
  const localEnhance = (exp) => {
    if (!exp) return ''
    const verbs = ['Led', 'Managed', 'Designed', 'Developed', 'Implemented', 'Improved', 'Optimized', 'Automated']
    const verb = verbs[Math.floor(Math.random() * verbs.length)]
    const what = exp.position || 'Responsibilities'
    const where = exp.company ? ` at ${exp.company}` : ''
    const metrics = exp.description && exp.description.match(/\d+\s*(?:%|percent|k|K|\+|years|year)/i)
    const metricText = metrics ? ` achieving ${metrics[0]}` : ''
    const base = exp.description ? exp.description.split('.').slice(0,2).join('. ') : ''
    return `${verb} ${what}${where} — ${base || 'Responsible for key initiatives.'}${metricText}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your job experience
          </p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p className="text-sm">
            Click "Add Experience" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-4"
            >
              {/* Title + Delete */}
              <div className="flex justify-between items-center">
                <h4 className="font-medium">
                  Experience #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs Grid */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  placeholder="Job Title"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                  type="month"
                  value={experience.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />

                <input
                  type="month"
                  value={experience.end_date}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  disabled={experience.is_current}
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:bg-gray-100"
                />
              </div>

              {/* Current Job Checkbox */}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "is_current", e.target.checked)
                  }
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">
                  Currently working here
                </span>
              </label>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Job Description
                  </label>
                  <button onClick={() => generateDescription(index)} disabled={generatingIndex === index || !experience.position || !experience.company}
                    type="button"
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
                  > {generatingIndex === index ? (
                    <Loader2 className="w-3 h-3 animate-spin"/>
                  ) : (
                    <Sparkle className="w-3 h-3" />
                  )}
                    
                    Enhance with AI
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={experience.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your key responsibilities and achievements..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
