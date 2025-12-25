
import React from 'react';
import { AppState, TemplateType } from '../types';
import { COLOR_STYLES, LOGO_LIGHT, LOGO_DARK } from '../constants';

interface CanvasProps {
  state: AppState;
  canvasRef: React.RefObject<HTMLDivElement>;
}

const Canvas: React.FC<CanvasProps> = ({ state, canvasRef }) => {
  const activeColorStyle = COLOR_STYLES.find(c => c.id === state.colorStyleId) || COLOR_STYLES[0];

  // الأنماط الفاتحة: ذهبي وأبيض، ذهبي فاتح
  const isLightStyle = state.colorStyleId === 'gold-white' || state.colorStyleId === 'light-gold';
  // الأنماط الغامقة: ذهبي وأسود، ذهبي داكن
  const isDarkStyle = state.colorStyleId === 'gold-black' || state.colorStyleId === 'dark-gold';

  const currentLogo = isLightStyle ? LOGO_LIGHT : LOGO_DARK;

  const getCanvasStyles = () => {
    const baseClass = "relative overflow-hidden shadow-2xl bg-neutral-900 mx-auto select-none w-full max-w-[500px]";
    const aspectRatioClass = "aspect-square"; 
    return `${baseClass} ${aspectRatioClass}`;
  };

  const textWeightStyle = {
    fontWeight: state.fontWeight
  };

  const renderContent = () => {
    if (state.template === TemplateType.IMAGE_ONLY) return null;

    let speakerNameColor = "text-[#ffc200]";
    let speakerTitleColor = "text-white";

    if (activeColorStyle.id === 'gold-black') {
      speakerNameColor = "text-[#ffc200]";
      speakerTitleColor = "text-white";
    } else if (activeColorStyle.id === 'gold-white') {
      speakerNameColor = "text-[#9d7503]";
      speakerTitleColor = "text-black";
    } else if (activeColorStyle.id === 'dark-gold') {
      speakerNameColor = "text-black";
      speakerTitleColor = "text-white";
    } else if (activeColorStyle.id === 'light-gold') {
      speakerNameColor = "text-[#9d7503]";
      speakerTitleColor = "text-black";
    }

    // ظل النص لضمان القراءة فوق الخلفيات الشفافة
    const brandingShadow = {
      textShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)'
    };

    return (
      <div className="absolute bottom-0 left-0 right-0 z-30 transition-all duration-500">
        
        {/* شريط الهوية الشفاف - طائر فوق الحاوية */}
        <div 
          className={`flex justify-between items-center px-5 py-2 ${activeColorStyle.text} bg-transparent relative z-40`}
          style={brandingShadow}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse shadow-sm"></span>
            <span className="text-[11px] font-black uppercase tracking-widest">QWMY NEWS</span>
          </div>
          <span className="text-[11px] font-black opacity-95">@QWMY_OFFICIAL</span>
        </div>

        {/* حاوية النص الرئيسية */}
        <div 
          className={`p-6 pb-10 ${activeColorStyle.bg} ${activeColorStyle.text} transition-all duration-300 shadow-2xl`}
        >
          <div className="flex flex-col gap-3">
            {state.template === TemplateType.BREAKING && (
              <div 
                className="inline-block px-3 py-1 self-start font-black text-white text-[11px] mb-1 shadow-md rounded-sm"
                style={{ backgroundColor: state.breakingColor }}
              >
                عاجل
              </div>
            )}

            {state.template === TemplateType.QUOTE && (
              <div className="border-r-4 border-[#FfC200] pr-4 py-1">
                <p 
                  className="leading-tight mb-4"
                  style={{ fontSize: `${state.textSize}px`, ...textWeightStyle }}
                >
                  "{state.mainText}"
                </p>
                <div className="flex flex-col">
                  <span className={`font-black text-sm ${speakerNameColor}`}>{state.speakerName}</span>
                  <span className={`text-[11px] font-bold leading-none ${speakerTitleColor} opacity-90`}>{state.speakerTitle}</span>
                </div>
              </div>
            )}

            {(state.template === TemplateType.NEWS || state.template === TemplateType.BREAKING) && (
              <p 
                className="leading-snug"
                style={{ 
                  fontSize: `${state.textSize}px`, 
                  ...textWeightStyle 
                }}
              >
                {state.mainText}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={canvasRef}
      className={getCanvasStyles()}
      id="main-canvas"
    >
      {state.backgroundImage ? (
        <div className="absolute inset-0 pointer-events-none">
          <img 
            src={state.backgroundImage} 
            alt="background" 
            className="w-full h-full object-cover"
            style={{
              transform: `scale(${state.imageZoom}) translate(${state.imageX}px, ${state.imageY}px)`,
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-500 text-[11px] font-bold">
          يرجى رفع صورة خلفية
        </div>
      )}

      {/* الشعار من مجلد assets */}
      <div className="absolute top-6 right-6 z-20">
        <img 
          src={currentLogo} 
          alt="QWMY Logo" 
          className="h-16 w-16 object-contain drop-shadow-2xl"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent && !parent.querySelector('.logo-fallback')) {
              const fallback = document.createElement('div');
              fallback.className = "logo-fallback bg-[#FfC200] text-black font-black w-14 h-14 flex items-center justify-center text-3xl shadow-2xl rounded-full border-4 border-white/30";
              fallback.innerText = "Q";
              parent.appendChild(fallback);
            }
          }}
        />
      </div>

      {state.template !== TemplateType.IMAGE_ONLY && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent pointer-events-none z-10"></div>
      )}

      {renderContent()}
    </div>
  );
};

export default Canvas;
