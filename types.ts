
export enum TemplateType {
  NEWS = 'خبر',
  BREAKING = 'عاجل',
  IMAGE_ONLY = 'صورة',
  QUOTE = 'تصريح',
}

export enum FontWeight {
  LIGHT = '300',
  REGULAR = '400',
  BOLD = '700',
  EXTRA_BOLD = '800',
}

export interface ColorStyle {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent: string;
}

export interface LayoutStyle {
  id: string;
  name: string;
}

export interface AppState {
  template: TemplateType;
  colorStyleId: string;
  layoutStyleId: string;
  mainText: string;
  speakerName: string;
  speakerTitle: string;
  backgroundImage: string | null;
  imageZoom: number;
  imageX: number;
  imageY: number;
  textSize: number;
  fontWeight: FontWeight;
  isDarkMode: boolean;
  breakingColor: string;
}
