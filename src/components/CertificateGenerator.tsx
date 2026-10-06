import { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import { Download, Loader2, ArrowRight, Languages, Smartphone, Image as ImageIcon, Share2, FileText, Eye } from 'lucide-react';
import { CertificateForm } from './CertificateForm';
import { CertificatePreview } from './CertificatePreview';
import type { CertificateData } from '../types';
import { translations } from '../i18n/translations';

export function CertificateGenerator() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [data, setData] = useState<CertificateData>({
    type: 'individual',
    name: '',
    familyMembers: 2,
    photoUrl: null,
    language: 'en',
    format: 'normal',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const t = translations[data.language];

  const generateImageBlob = async (): Promise<Blob | null> => {
    if (!certificateRef.current) return null;
    const element = certificateRef.current;
    const targetWidth = data.format === 'story' ? 1080 : 3840;
    const currentWidth = element.offsetWidth;
    const scale = targetWidth / currentWidth;

    const dataUrl = await htmlToImage.toJpeg(element, {
      quality: 0.95,
      pixelRatio: scale,
      backgroundColor: '#ffffff'
    });

    const response = await fetch(dataUrl);
    return await response.blob();
  };

  const getFileName = () => {
    return data.name ? `${data.name.replace(/\s+/g, '_')}_Certificate.jpg` : 'Church_Certificate.jpg';
  };

  const resetForm = () => {
    setData({
      type: 'individual',
      name: '',
      familyMembers: 2,
      photoUrl: null,
      language: 'en',
      format: 'normal',
    });
    setStep(1);
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const blob = await generateImageBlob();
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = getFileName();
      link.click();
      URL.revokeObjectURL(url);

      // Clear and move to home page after generation as requested
      setTimeout(() => resetForm(), 500);
    } catch (error) {
      console.error('Failed to generate certificate:', error);
      alert('Failed to generate certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      const blob = await generateImageBlob();
      if (!blob) return;

      const file = new File([blob], getFileName(), { type: 'image/jpeg' });
      const shareData = {
        title: 'St. Theresa Church Certificate',
        text: `Here is my certificate from St. Theresa's Church!`,
        files: [file]
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        // Clear and move to home page after successful share
        setTimeout(() => resetForm(), 500);
      } else {
        alert("Native sharing isn't supported on this device/browser. Please use the Download button instead.");
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Failed to share:', error);
        alert('Failed to share certificate.');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 w-full">

      {/* App Logo & Header (Only on Step 1) */}
      {step === 1 && (
        <div className="flex flex-col items-center mb-8 sm:mb-12 pt-2 sm:pt-6 animate-in slide-in-from-top-4 duration-700 fade-in">
          <div className="relative mb-4 sm:mb-6">
            <div className="absolute inset-0 bg-[#b48d42] rounded-full blur-[20px] opacity-20 transform scale-110 animate-pulse"></div>
            <img
              src="/sts.jpg"
              alt="St. Theresa Church"
              className="relative w-24 h-24 sm:w-28 sm:h-28 object-contain bg-white rounded-full shadow-lg border-4 border-white p-1"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 tracking-tight text-center px-4">St. Theresa Church</h1>
          <div className="flex items-center gap-3 sm:gap-4 mt-3">
            <div className="h-[1px] w-6 sm:w-8 bg-[#b48d42]/40"></div>
            <p className="text-[#b48d42] font-semibold text-xs sm:text-sm uppercase tracking-widest text-center">Certificate Generator</p>
            <div className="h-[1px] w-6 sm:w-8 bg-[#b48d42]/40"></div>
          </div>
        </div>
      )}

      {/* Progress Bar Segmented Control */}
      <div className="mb-10 w-full px-4 sm:px-0">
        <div className="flex items-center bg-gray-100 p-1.5 rounded-full relative w-full sm:max-w-md mx-auto text-xs sm:text-sm font-bold shadow-inner">
          <div className="flex-1 z-10 flex justify-center">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center justify-center gap-1.5 w-full py-3 rounded-full transition-all duration-300 ${step === 1 ? 'bg-white text-[#b48d42] shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'text-gray-400 hover:text-gray-600'
                }`}
            >
              {step === 1 && <Languages className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span>Language</span>
            </button>
          </div>

          <div className="flex-1 z-10 flex justify-center">
            <button
              onClick={() => {
                // Allow going back to Step 2, or advancing from Step 1
                if (step === 3 || step === 1) setStep(2);
              }}
              disabled={step === 1} // Actually, let them use the main language buttons to advance to step 2
              className={`flex items-center justify-center gap-1.5 w-full py-3 rounded-full transition-all duration-300 ${step === 2 ? 'bg-white text-[#b48d42] shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'text-gray-400 hover:text-gray-600'
                } ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {step === 2 && <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span>Details</span>
            </button>
          </div>

          <div className="flex-1 z-10 flex justify-center">
            <button
              onClick={() => {
                if (step < 3 && data.name.trim()) setStep(3);
              }}
              disabled={step < 3} // Let them use the 'Next' button at bottom to advance to step 3
              className={`flex items-center justify-center gap-1.5 w-full py-3 rounded-full transition-all duration-300 ${step === 3 ? 'bg-white text-[#b48d42] shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'text-gray-400 hover:text-gray-600'
                } ${step < 3 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {step === 3 && <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span>Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step 1: Language Selection */}
      {step === 1 && (
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 max-w-lg mx-auto text-center relative overflow-hidden group hover:shadow-[0_20px_50px_rgba(180,141,66,0.08)] transition-shadow duration-500">
          <Languages className="w-12 h-12 sm:w-16 sm:h-16 text-[#b48d42] mx-auto mb-6 relative z-10" />
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-8 relative z-10">Choose Your Language<br /><span className="text-lg sm:text-xl text-gray-500 font-sans font-normal mt-2 block">மொழியைத் தேர்ந்தெடுக்கவும்</span></h2>

          <div className="flex flex-col gap-4 sm:gap-5 relative z-10">
            <button
              onClick={() => { setData({ ...data, language: 'en' }); setStep(2); }}
              className="w-full py-4 sm:py-5 px-6 sm:px-8 bg-gray-50 hover:bg-[#b48d42] border border-gray-100 hover:border-[#b48d42] rounded-2xl text-lg sm:text-xl font-medium text-gray-800 hover:text-white transition-all flex justify-between items-center group shadow-sm hover:shadow-lg hover:shadow-[#b48d42]/30"
            >
              English
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
            <button
              onClick={() => { setData({ ...data, language: 'ta' }); setStep(2); }}
              className="w-full py-4 sm:py-5 px-6 sm:px-8 bg-gray-50 hover:bg-[#b48d42] border border-gray-100 hover:border-[#b48d42] rounded-2xl text-lg sm:text-xl font-medium text-gray-800 hover:text-white transition-all flex justify-between items-center group shadow-sm hover:shadow-lg hover:shadow-[#b48d42]/30"
            >
              தமிழ் (Tamil)
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Form */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CertificateForm data={data} onChange={setData} />

          <div className="mt-8 max-w-lg mx-auto">
            <button
              onClick={() => setStep(3)}
              disabled={!data.name.trim()} // Name is compulsory
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-[#b48d42] to-[#9c7631] hover:from-[#9c7631] hover:to-[#836227] active:scale-[0.98] shadow-lg hover:shadow-xl hover:shadow-amber-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-[#b48d42]/50"
            >
              {t.btn_next_preview}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Preview & Download */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">

          <div className="flex flex-col items-center mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Format</h3>
            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
              <button
                onClick={() => setData({ ...data, format: 'normal' })}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${data.format === 'normal'
                    ? 'bg-white text-[#b48d42] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <ImageIcon className="w-5 h-5" />
                Normal Certificate
              </button>
              <button
                onClick={() => setData({ ...data, format: 'story' })}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${data.format === 'story'
                    ? 'bg-white text-[#b48d42] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Smartphone className="w-5 h-5" />
                WhatsApp Story
              </button>
            </div>
          </div>

          <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex justify-center bg-gray-50/50">
            <div className={`w-full overflow-hidden rounded-lg shadow-sm border border-gray-200 mx-auto transition-all ${data.format === 'story'
                ? 'max-w-[180px] sm:max-w-[220px]' // Much narrower for tall story format so it fits on screen
                : 'max-w-[320px] sm:max-w-[500px]' // Narrower for normal format
              }`}>
              <CertificatePreview ref={certificateRef} data={data} />
            </div>
          </div>


          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Native Web Share API Button (Mobile mainly) */}
              <button
                onClick={handleShare}
                disabled={isSharing || isGenerating}
                className={`flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-md hover:shadow-lg border-2 ${isSharing || isGenerating
                    ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                    : 'border-[#b48d42] text-[#b48d42] bg-white hover:bg-amber-50 active:scale-[0.98]'
                  }`}
              >
                {isSharing ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Share2 className="w-6 h-6" />
                )}
                Share
              </button>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={isGenerating || isSharing}
                className={`flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-bold text-lg text-white transition-all shadow-lg hover:shadow-xl hover:shadow-amber-900/20 border border-white/20 ${isGenerating || isSharing
                    ? 'bg-amber-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#b48d42] to-[#9c7631] hover:from-[#9c7631] hover:to-[#836227] active:scale-[0.98]'
                  }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {t.generating}
                  </>
                ) : (
                  <>
                    <Download className="w-6 h-6" />
                    {t.btn_generate}
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
