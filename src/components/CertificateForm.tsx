import { useRef } from 'react';
import type { ChangeEvent } from 'react';
import type { CertificateData } from '../types';
import { Upload, Camera, Trash2 } from 'lucide-react';
import { translations } from '../i18n/translations';

interface CertificateFormProps {
  data: CertificateData;
  onChange: (data: CertificateData) => void;
}

export function CertificateForm({ data, onChange }: CertificateFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const t = translations[data.language];

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onChange({ ...data, photoUrl: url });
    }
  };

  return (
    <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 w-full max-w-xl mx-auto group hover:shadow-[0_20px_50px_rgba(180,141,66,0.08)] transition-shadow duration-500">
      <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-8 text-gray-900 text-center">{t.step2_title}</h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 tracking-wide">{t.type_label}</label>
          <div className="flex gap-4 sm:gap-6">
            <label className={`flex items-center gap-2 cursor-pointer p-4 border-2 rounded-2xl flex-1 justify-center transition-all ${data.type === 'individual' ? 'border-[#b48d42] bg-amber-50 text-[#b48d42]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'}`}>
              <input 
                type="radio" 
                name="type" 
                value="individual"
                checked={data.type === 'individual'}
                onChange={() => onChange({ ...data, type: 'individual' })}
                className="hidden"
              />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${data.type === 'individual' ? 'border-[#b48d42]' : 'border-gray-300'}`}>
                {data.type === 'individual' && <div className="w-2 h-2 bg-[#b48d42] rounded-full"></div>}
              </div>
              <span className="font-bold">{t.type_individual}</span>
            </label>
            <label className={`flex items-center gap-2 cursor-pointer p-4 border-2 rounded-2xl flex-1 justify-center transition-all ${data.type === 'family' ? 'border-[#b48d42] bg-amber-50 text-[#b48d42]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'}`}>
              <input 
                type="radio" 
                name="type" 
                value="family"
                checked={data.type === 'family'}
                onChange={() => onChange({ ...data, type: 'family' })}
                className="hidden"
              />
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${data.type === 'family' ? 'border-[#b48d42]' : 'border-gray-300'}`}>
                {data.type === 'family' && <div className="w-2 h-2 bg-[#b48d42] rounded-full"></div>}
              </div>
              <span className="font-bold">{t.type_family}</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">
            {data.type === 'individual' ? t.name_individual : t.name_family} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-[#b48d42] outline-none transition-all font-medium text-lg"
            placeholder={data.type === 'individual' ? t.name_placeholder_individual : t.name_placeholder_family}
          />
        </div>

        {/* Family member count removed as requested */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide">{t.photo_label}</label>
          <div className="mt-1 flex justify-center px-6 pt-8 pb-10 border-2 border-gray-200 border-dashed rounded-3xl hover:bg-[#b48d42]/5 hover:border-[#b48d42]/50 transition-all group">
            <div className="space-y-2 text-center w-full">
              {data.photoUrl ? (
                <div className="flex flex-col items-center">
                  <div className="relative inline-block mb-3">
                    <div className="p-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                      <img src={data.photoUrl} alt="Preview" className="h-24 w-24 object-contain rounded-xl" />
                    </div>
                      <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange({ ...data, photoUrl: null });
                      }}
                      className="absolute -top-3 -right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-transform hover:scale-110"
                      title="Clear Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload New
                    </button>
                    <button 
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      Take New
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex gap-4 sm:gap-6 mb-4">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center justify-center w-28 h-28 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#b48d42]/50 hover:shadow-md transition-all gap-2 text-gray-500 hover:text-[#b48d42]"
                    >
                      <Upload className="h-8 w-8" />
                      <span className="text-xs font-semibold">{t.photo_upload || 'Upload File'}</span>
                    </button>

                    <button 
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="flex flex-col items-center justify-center w-28 h-28 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-[#b48d42]/50 hover:shadow-md transition-all gap-2 text-gray-500 hover:text-[#b48d42]"
                    >
                      <Camera className="h-8 w-8" />
                      <span className="text-xs font-semibold">Take Selfie</span>
                    </button>
                  </div>
                  <p className="text-xs font-medium text-gray-400 mt-2">{t.photo_hint}</p>
                </div>
              )}
            </div>
            
            {/* Hidden file inputs */}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden" 
            />
            <input 
              ref={cameraInputRef}
              type="file" 
              accept="image/*"
              capture="user"
              onChange={handlePhotoUpload}
              className="hidden" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
