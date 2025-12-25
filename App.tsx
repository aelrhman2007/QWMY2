
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  TemplateType, 
  FontWeight, 
  AppState 
} from './types';
import { COLOR_STYLES, LAYOUT_STYLES } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import Canvas from './components/Canvas';
import SideMenu from './components/SideMenu';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    template: TemplateType.NEWS,
    colorStyleId: 'gold-black',
    layoutStyleId: 'classic',
    mainText: 'اكتب عنوان الخبر الرئيسي هنا بشكل جذاب واحترافي',
    speakerName: 'اسم المتحدث الرسمي',
    speakerTitle: 'المنصب الوظيفي هنا',
    backgroundImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000',
    imageZoom: 1,
    imageX: 0,
    imageY: 0,
    textSize: 24,
    fontWeight: FontWeight.BOLD,
    isDarkMode: true,
    breakingColor: '#ef4444', 
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.isDarkMode]);

  const handleExport = useCallback(async () => {
    if (canvasRef.current) {
      const canvas = await (window as any).html2canvas(canvasRef.current, {
        useCORS: true,
        scale: 3, // دقة أعلى عند التصدير
      });
      const link = document.createElement('a');
      link.download = `qwmy-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  }, []);

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen font-tajawal bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <Header 
        onMenuToggle={() => setIsMenuOpen(true)} 
        onExport={handleExport}
        isDarkMode={state.isDarkMode}
      />

      <main className="pt-16 pb-24 flex justify-center items-center px-2">
        <Canvas state={state} canvasRef={canvasRef} />
      </main>

      <Footer state={state} updateState={updateState} />

      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isDarkMode={state.isDarkMode}
        toggleDarkMode={() => updateState({ isDarkMode: !state.isDarkMode })}
      />
    </div>
  );
};

export default App;
