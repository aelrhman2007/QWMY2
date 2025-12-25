
import React, { useState } from 'react';
import { AppState, TemplateType, FontWeight } from '../types';
import { COLOR_STYLES } from '../constants';

interface FooterProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
}

const Footer: React.FC<FooterProps> = ({ state, updateState }) => {
  const [activePopup, setActivePopup] = useState<'template' | 'text' | 'image' | 'style' | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const togglePopup = (popup: 'template' | 'text' | 'image' | 'style') => {
    setActivePopup(activePopup === popup ? null : popup);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateState({ backgroundImage: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const PAN_STEP = 5;
  const ZOOM_STEP = 0.05;

  const Icons = {
    Template: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    Text: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    Image: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    Style: () => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    )
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[100] w-full px-2 max-w-xl pb-4">
      
      {/* زر التبديل - يظل ثابتاً ومرئياً في المنتصف دائماً */}
      <div className="relative flex justify-center w-full mb-2">
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="bg-[#FfC200] text-black p-2.5 rounded-full shadow-[0_4px_20px_rgba(255,194,0,0.4)] border-2 border-white dark:border-neutral-800 z-[110] active:scale-90 transition-all hover:brightness-110 hover:scale-110"
          aria-label={isVisible ? "إخفاء الفوتر" : "إظهار الفوتر"}
        >
          <svg className={`w-5 h-5 transition-transform duration-500 ${isVisible ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* حاوية القوائم */}
      <div className={`transition-all duration-500 origin-bottom transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-90 pointer-events-none'}`}>
        <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-neutral-800 p-1">
          
          {activePopup === 'template' && (
            <div className="absolute bottom-full left-0 right-0 mb-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-4 border dark:border-neutral-700 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">القالب الإخباري</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(TemplateType).map(t => (
                    <button 
                      key={t}
                      onClick={() => updateState({ template: t })}
                      className={`py-2 px-1 text-[11px] rounded-xl transition-all ${state.template === t ? 'bg-[#FfC200] text-black font-bold shadow-lg' : 'bg-gray-50 dark:bg-neutral-700 dark:text-white hover:bg-gray-100'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">نمط الألوان</label>
                <div className="grid grid-cols-1 gap-2">
                  {COLOR_STYLES.map(c => (
                    <button 
                      key={c.id}
                      onClick={() => updateState({ colorStyleId: c.id })}
                      className={`py-2 px-3 text-[11px] rounded-xl text-right transition-all border ${state.colorStyleId === c.id ? 'bg-[#FfC200] border-[#FfC200] text-black font-bold' : 'bg-gray-50 dark:bg-neutral-700 dark:text-white border-transparent'}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activePopup === 'text' && (
            <div className="absolute bottom-full left-0 right-0 mb-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-4 border dark:border-neutral-700 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div>
                <label className="text-[10px] font-black block mb-2 text-gray-400 uppercase tracking-widest">العنوان الرئيسي</label>
                <textarea 
                  className="w-full p-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-[#FfC200] outline-none transition-all"
                  rows={3}
                  value={state.mainText}
                  onChange={(e) => updateState({ mainText: e.target.value })}
                  placeholder="اكتب الخبر هنا..."
                />
              </div>
              {state.template === TemplateType.QUOTE && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black block mb-2 text-gray-400 uppercase tracking-widest">اسم القائل</label>
                    <input 
                      className="w-full p-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm dark:text-white outline-none focus:ring-2 focus:ring-[#FfC200]"
                      value={state.speakerName}
                      onChange={(e) => updateState({ speakerName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black block mb-2 text-gray-400 uppercase tracking-widest">المسمى الوظيفي</label>
                    <input 
                      className="w-full p-3 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl text-sm dark:text-white outline-none focus:ring-2 focus:ring-[#FfC200]"
                      value={state.speakerTitle}
                      onChange={(e) => updateState({ speakerTitle: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activePopup === 'image' && (
            <div className="absolute bottom-full left-0 right-0 mb-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-5 border dark:border-neutral-700 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-center"><button onClick={() => updateState({ imageY: state.imageY - PAN_STEP })} className="p-3 bg-gray-100 dark:bg-neutral-700 rounded-xl hover:bg-[#FfC200] hover:text-black transition-colors">↑</button></div>
                  <div className="flex gap-2">
                    <button onClick={() => updateState({ imageX: state.imageX - PAN_STEP })} className="p-3 bg-gray-100 dark:bg-neutral-700 rounded-xl hover:bg-[#FfC200] hover:text-black transition-colors">←</button>
                    <button onClick={() => updateState({ imageX: state.imageX + PAN_STEP })} className="p-3 bg-gray-100 dark:bg-neutral-700 rounded-xl hover:bg-[#FfC200] hover:text-black transition-colors">→</button>
                  </div>
                  <div className="flex justify-center"><button onClick={() => updateState({ imageY: state.imageY + PAN_STEP })} className="p-3 bg-gray-100 dark:bg-neutral-700 rounded-xl hover:bg-[#FfC200] hover:text-black transition-colors">↓</button></div>
                </div>
                <div className="flex-1 w-full space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px] font-black dark:text-gray-400 uppercase">
                      <span>التحجيم</span>
                      <span>{Math.round(state.imageZoom * 100)}%</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => updateState({ imageZoom: Math.max(0.1, state.imageZoom - ZOOM_STEP) })} className="w-10 h-10 bg-gray-100 dark:bg-neutral-700 rounded-full font-bold flex items-center justify-center">-</button>
                      <input type="range" min="0.1" max="3" step="0.05" value={state.imageZoom} onChange={(e) => updateState({ imageZoom: parseFloat(e.target.value) })} className="flex-1 h-2 accent-[#FfC200] bg-gray-200 dark:bg-neutral-600 rounded-lg appearance-none cursor-pointer" />
                      <button onClick={() => updateState({ imageZoom: state.imageZoom + ZOOM_STEP })} className="w-10 h-10 bg-gray-100 dark:bg-neutral-700 rounded-full font-bold flex items-center justify-center">+</button>
                    </div>
                  </div>
                  <label className="w-full cursor-pointer bg-[#FfC200] hover:bg-black hover:text-[#FfC200] text-black font-black py-3 rounded-xl text-sm text-center block transition-all shadow-lg active:scale-95">
                    رفع صورة جديدة
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                  </label>
                </div>
              </div>
            </div>
          )}

          {activePopup === 'style' && (
            <div className="absolute bottom-full left-0 right-0 mb-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-5 border dark:border-neutral-700 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">حجم الخط</label>
                  <span className="text-sm font-black dark:text-white bg-neutral-100 dark:bg-neutral-700 px-3 py-1 rounded-lg">{state.textSize}px</span>
                </div>
                <input 
                  type="range" min="12" max="60" value={state.textSize} 
                  onChange={(e) => updateState({ textSize: parseInt(e.target.value) })}
                  className="w-full accent-[#FfC200] h-2 bg-gray-200 dark:bg-neutral-600 rounded-lg appearance-none cursor-pointer" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">ثقل الخط</label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(FontWeight).map(([label, value]) => (
                    <button 
                      key={value}
                      onClick={() => updateState({ fontWeight: value as FontWeight })}
                      className={`py-2 text-[11px] rounded-xl border transition-all ${state.fontWeight === value ? 'bg-[#FfC200] border-[#FfC200] text-black font-black shadow-lg' : 'border-gray-200 dark:border-neutral-600 dark:text-white hover:border-[#FfC200]'}`}
                    >
                      {label === 'BOLD' ? 'عريض' : label === 'REGULAR' ? 'عادي' : label === 'LIGHT' ? 'خفيف' : 'ثقيل'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-around h-16">
            <button 
              onClick={() => togglePopup('template')}
              className={`flex flex-col items-center justify-center w-full h-full transition-all rounded-xl gap-1.5 ${activePopup === 'template' ? 'text-[#FfC200] bg-neutral-50 dark:bg-neutral-800 scale-105' : 'text-gray-400 hover:text-[#FfC200]'}`}
            >
              <Icons.Template />
              <span className="text-[10px] font-black uppercase">القالب</span>
            </button>
            
            <button 
              onClick={() => togglePopup('text')}
              className={`flex flex-col items-center justify-center w-full h-full transition-all rounded-xl gap-1.5 ${activePopup === 'text' ? 'text-[#FfC200] bg-neutral-50 dark:bg-neutral-800 scale-105' : 'text-gray-400 hover:text-[#FfC200]'}`}
            >
              <Icons.Text />
              <span className="text-[10px] font-black uppercase">النص</span>
            </button>

            <button 
              onClick={() => togglePopup('image')}
              className={`flex flex-col items-center justify-center w-full h-full transition-all rounded-xl gap-1.5 ${activePopup === 'image' ? 'text-[#FfC200] bg-neutral-50 dark:bg-neutral-800 scale-105' : 'text-gray-400 hover:text-[#FfC200]'}`}
            >
              <Icons.Image />
              <span className="text-[10px] font-black uppercase">الصورة</span>
            </button>

            <button 
              onClick={() => togglePopup('style')}
              className={`flex flex-col items-center justify-center w-full h-full transition-all rounded-xl gap-1.5 ${activePopup === 'style' ? 'text-[#FfC200] bg-neutral-50 dark:bg-neutral-800 scale-105' : 'text-gray-400 hover:text-[#FfC200]'}`}
            >
              <Icons.Style />
              <span className="text-[10px] font-black uppercase">الخط</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
