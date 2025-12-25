
import { ColorStyle, LayoutStyle } from './types';

export const COLOR_STYLES: ColorStyle[] = [
  { id: 'gold-black', name: 'ذهبي وأسود', bg: 'bg-black', text: 'text-[#ffc200]', accent: 'text-[#ffc200]' },
  { id: 'gold-white', name: 'ذهبي وأبيض', bg: 'bg-white', text: 'text-black', accent: 'text-[#9d7503]' },
  { id: 'dark-gold', name: 'ذهبي داكن', bg: 'bg-[#9d7503]', text: 'text-white', accent: 'text-black' },
  { id: 'light-gold', name: 'ذهبي فاتح', bg: 'bg-[#FFFDF5]', text: 'text-[#9d7503]', accent: 'text-black' },
];

export const LAYOUT_STYLES: LayoutStyle[] = [
  { id: 'classic', name: 'كلاسيكي' },
  { id: 'modern', name: 'مودرن' },
  { id: 'full-width', name: 'عرض كامل' },
  { id: 'minimal', name: 'مينيمال' },
];

// الشعارات المرفوعة في مجلد assets
export const LOGO_LIGHT = "assets/logo-light.png";
export const LOGO_DARK = "assets/logo-dark.png";

export const LOGO_PLACEHOLDER = LOGO_DARK; 
export const SOCIAL_PLACEHOLDER = "";
