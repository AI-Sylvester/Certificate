import { forwardRef } from 'react';
import type { CertificateData } from '../types';
import { translations } from '../i18n/translations';

interface CertificatePreviewProps {
  data: CertificateData;
}

export const CertificatePreview = forwardRef<HTMLDivElement, CertificatePreviewProps>(
  ({ data }, ref) => {
    const t = translations[data.language];
    
    // Get today's date and day of week formatted nicely based on the language
    const today = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString(data.language === 'ta' ? 'ta-IN' : 'en-US', dateOptions);
    const bodyText = t.cert_body.replace('{day}', formattedDate);

    return (
      <div 
        ref={ref}
        className="@container relative w-full overflow-hidden bg-white shadow-xl flex items-center justify-center font-serif text-blue-950"
        style={{ aspectRatio: data.format === 'story' ? '9 / 16' : '1.414 / 1' }}
      >
        {/* Template Background Image - Switches based on language and format */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: data.format === 'story' 
              ? 'url(/wg.png)' 
              : (data.language === 'ta' ? 'url(/Bg_ta.png), url(/Bg.png)' : 'url(/Bg.png)')
          }}
        >
        </div>

        {/* Certificate Content */}
        <div className={`relative z-10 flex flex-col items-center text-center w-full h-full [&_*]:[text-shadow:0_1px_3px_rgba(255,255,255,0.9),0_0_10px_rgba(255,255,255,0.6)] ${
          data.format === 'story' 
            ? 'px-[12cqw] pt-[55cqw] pb-[16cqw] justify-start' // Push down to clear logo, stack items
            : 'px-[14cqw] pt-[20cqw] pb-[10cqw] justify-between' // Normal paddings spread out
        }`}>
          
          {/* Header Section */}
          <div className="flex flex-col items-center w-full">
            <h1 className={`font-serif text-[#b48d42] font-extrabold uppercase drop-shadow-md leading-none ${
              data.format === 'story' ? 'text-[7cqw]' : 'text-[4.5cqw]'
            } ${data.language === 'en' ? 'tracking-widest' : ''}`}>
              {t.cert_title}
            </h1>
            
            <div className={`flex items-center gap-[1.2cqw] ${data.format === 'story' ? 'mt-[2cqw]' : 'mt-[1cqw]'}`}>
              <div className={`bg-[#b48d42] shadow-sm ${data.format === 'story' ? 'h-[0.3cqw] w-[5cqw]' : 'h-[0.2cqw] w-[3cqw]'}`}></div>
              <h2 className={`text-black font-serif font-bold leading-none ${
                data.format === 'story' ? 'text-[2.5cqw]' : 'text-[1.6cqw]'
              } ${data.language === 'en' ? 'tracking-widest' : ''}`}>
                {t.cert_subtitle}
              </h2>
              <div className={`bg-[#b48d42] shadow-sm ${data.format === 'story' ? 'h-[0.3cqw] w-[5cqw]' : 'h-[0.2cqw] w-[3cqw]'}`}></div>
            </div>
          </div>

          <div className={`text-black uppercase font-bold italic ${
            data.format === 'story' ? 'text-[2.5cqw] mt-[3cqw]' : 'text-[1.4cqw] mt-[1cqw]'
          } ${data.language === 'en' ? 'tracking-widest' : ''}`}>
            {t.cert_presented_to}
          </div>

          {/* Name Section */}
          <div className={`w-full border-black/30 flex flex-col items-center ${
            data.format === 'story' ? 'max-w-[85cqw] pb-[1cqw] mt-[1cqw] border-b-[0.2cqw]' : 'max-w-[65cqw] pb-[0.5cqw] mt-[0.5cqw] border-b-[0.2cqw]'
          }`}>
            <div 
              className={`font-serif text-[#0f2461] font-extrabold italic w-full whitespace-nowrap tracking-tight`}
              style={{
                fontSize: `${Math.min(
                  data.format === 'story' ? 8 : 3.5,
                  (data.format === 'story' ? 85 : 65) / (((data.name ? (data.name + (data.type === 'family' ? t.cert_and_family : '')) : t.name_individual).length + 2) * 0.55)
                )}cqw`
              }}
            >
              {data.name ? (data.name + (data.type === 'family' ? t.cert_and_family : '')) : t.name_individual}
            </div>
          </div>

          {/* Biblical Blessing */}
          <div className={`max-w-[85cqw] ${data.format === 'story' ? 'mt-[1.5cqw]' : 'mt-[0.5cqw] max-w-[70cqw]'}`}>
            <p className={`font-serif text-[#7a1313] italic font-bold leading-relaxed ${
              data.format === 'story' ? 'text-[3cqw]' : 'text-[1.4cqw]'
            }`}>
              "{t.cert_blessing}"
            </p>
          </div>

          {/* Photo Frame Container */}
          <div className={`relative flex-shrink-0 ${
            data.format === 'story' ? 'mt-[3cqw] mb-[2cqw]' : 'mt-[1cqw] mb-[1cqw]'
          }`}>
            {data.photoUrl ? (
              <img 
                src={data.photoUrl} 
                alt="Participant" 
                className={`relative object-contain bg-white border-white shadow-[0_1.5cqw_3cqw_rgb(0,0,0,0.3)] ring-[#b48d42]/60 z-10 ${
                  data.format === 'story'
                    ? (data.type === 'individual' ? 'w-[32cqw] h-[32cqw] rounded-full border-[0.6cqw] ring-[0.6cqw]' : 'w-[48cqw] h-[32cqw] rounded-3xl border-[0.6cqw] ring-[0.6cqw]')
                    : (data.type === 'individual' ? 'w-[16cqw] h-[16cqw] rounded-full border-[0.4cqw] ring-[0.4cqw]' : 'w-[24cqw] h-[16cqw] rounded-2xl border-[0.4cqw] ring-[0.4cqw]')
                }`}
              />
            ) : (
              <div 
                className={`relative bg-white/80 backdrop-blur-sm border-white shadow-lg flex items-center justify-center text-gray-800 font-bold z-10 ${
                  data.format === 'story'
                    ? (data.type === 'individual' ? 'w-[32cqw] h-[32cqw] rounded-full border-[0.6cqw] text-[2.5cqw]' : 'w-[48cqw] h-[32cqw] rounded-3xl border-[0.6cqw] text-[2.5cqw]')
                    : (data.type === 'individual' ? 'w-[16cqw] h-[16cqw] rounded-full border-[0.4cqw] text-[1.2cqw]' : 'w-[24cqw] h-[16cqw] rounded-2xl border-[0.4cqw] text-[1.2cqw]')
                }`}
              >
                {t.cert_photo_placeholder}
              </div>
            )}
          </div>

          {/* Body Text */}
          <div className={`text-black max-w-[85cqw] leading-relaxed font-bold ${
            data.format === 'story' ? 'text-[2.5cqw] mb-[0cqw]' : 'text-[1.2cqw] max-w-[70cqw] mb-[0.5cqw]'
          }`}>
            {bodyText}
          </div>

          {/* Signatures */}
          <div className={`w-full flex justify-between ${
            data.format === 'story' ? 'px-[8cqw] mt-[4cqw]' : 'px-[4cqw] mt-auto'
          }`}>
            <div className={`text-center ${data.format === 'story' ? 'w-[35cqw]' : 'w-[30cqw]'}`}>
              <div className={`flex items-end justify-center ${data.format === 'story' ? 'h-[5cqw] pb-[1cqw]' : 'h-[2.5cqw] pb-[0.3cqw]'}`}>
                <div className={`font-bold text-[#0f2461] uppercase leading-none whitespace-nowrap ${
                  data.format === 'story' ? 'text-[2cqw]' : 'text-[1.2cqw]'
                } ${data.language === 'en' ? 'tracking-wider' : ''}`}>{t.cert_pastor}</div>
              </div>
              <div className="border-b-[0.2cqw] border-black/40 mb-[0.3cqw]"></div>
              <div className={`font-bold text-black uppercase ${
                data.format === 'story' ? 'text-[1.5cqw]' : 'text-[1cqw]'
              } ${data.language === 'en' ? 'tracking-widest' : ''}`}>{t.cert_pastor_title}</div>
            </div>
            
            <div className={`text-center ${data.format === 'story' ? 'w-[35cqw]' : 'w-[30cqw]'}`}>
              <div className={`border-b-[0.2cqw] border-black/40 mb-[0.3cqw] flex items-end justify-center ${
                data.format === 'story' ? 'h-[5cqw] pb-[0.8cqw]' : 'h-[2.5cqw] pb-[0.2cqw]'
              }`}>
                <span className={`font-extrabold text-[#0f2461] leading-none whitespace-nowrap ${
                  data.format === 'story' ? 'text-[2cqw]' : 'text-[1.2cqw]'
                }`}>{formattedDate}</span>
              </div>
              <div className={`font-bold text-black uppercase ${
                data.format === 'story' ? 'text-[1.5cqw]' : 'text-[1cqw]'
              } ${data.language === 'en' ? 'tracking-wider' : ''}`}>{t.cert_date}</div>
            </div>
          </div>
          
          {/* Generation Timestamp Footer */}
          <div className={`absolute left-1/2 -translate-x-1/2 font-sans font-medium text-black/40 whitespace-nowrap ${
            data.format === 'story' ? 'bottom-[2cqw] text-[1.5cqw]' : 'bottom-[1.5cqw] text-[0.8cqw]'
          }`}>
            Generated: {String(today.getDate()).padStart(2, '0')}/{String(today.getMonth() + 1).padStart(2, '0')}/{today.getFullYear()} {today.toLocaleTimeString(data.language === 'ta' ? 'ta-IN' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>

        </div>
      </div>
    );
  }
);
