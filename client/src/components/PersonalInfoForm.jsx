import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  User,
  Camera,
  Sparkles
} from "lucide-react";
import React, { useEffect, useState } from "react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const [preview, setPreview] = useState(null);

  // KHRABI FIX: Optional chaining add ki taake agar data load ho raha ho to app crash na kare
  useEffect(() => {
    if (!data?.image) {
      setPreview(null);
      return;
    }

    if (typeof data.image === "string") {
      setPreview(data.image);
    } else if (data.image instanceof File || data.image instanceof Blob) {
      // Create object URL only if it's a valid File/Blob object
      const objectUrl = URL.createObjectURL(data.image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [data?.image]);

  const handleChange = (field, value) => {
    // KHRABI FIX: Spread operator se pehle data ka check lazmi hai
    onChange({ ...(data || {}), [field]: value });
  };

  const fields = [
    { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
    { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div className="space-y-6 font-poppins">
      <div className="pb-4 border-b border-slate-100">
        <h3 className="text-xl font-bold text-slate-800">Personal Information</h3>
        <p className="text-xs text-slate-500 mt-1">Setup your identity for the resume</p>
      </div>

      {/* Image Upload Section */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="relative group">
          <label className="cursor-pointer block">
            {preview ? (
              <img
                src={preview}
                alt="user-image"
                className="size-24 rounded-2xl object-cover ring-4 ring-white shadow-md group-hover:opacity-90 transition-all"
              />
            ) : (
              <div className="size-24 rounded-2xl bg-white border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 group-hover:border-green-400 group-hover:text-green-500 transition-all">
                <Camera className="size-8 mb-1" />
                <span className="text-[10px] font-bold uppercase">Upload</span>
              </div>
            )}
            <input
              type="file"
              accept="image/jpeg, image/png"
              className="hidden"
              onChange={(e) => handleChange("image", e.target.files[0])}
            />
          </label>
        </div>

        {/* AI Background Remover Toggle */}
        {/* KHRABI FIX: Safe check for data.image */}
        {data?.image && typeof data.image === "object" && (
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-violet-600">
              <Sparkles className="size-4" />
              <p className="text-xs font-black uppercase tracking-widest">AI Magic Tool</p>
            </div>
            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-sm font-semibold text-slate-700">Remove Background</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  onChange={() => setRemoveBackground((prev) => !prev)}
                  checked={removeBackground}
                />
                <div className="w-10 h-5 bg-slate-200 rounded-full peer peer-checked:bg-violet-500 transition-colors duration-200"></div>
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 gap-5">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
              <field.icon className="size-3.5" />
              {field.label}
              {field.required && <span className="text-red-500 ml-0.5">*</span>}
            </label>
            <input
              type={field.type}
              // KHRABI FIX: data?.[field.key] use kiya taake undefined error na aaye
              value={data?.[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-600 transition-all font-poppins"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfoForm;