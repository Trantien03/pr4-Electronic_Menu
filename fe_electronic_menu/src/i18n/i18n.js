import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import vi from './vi.json';

// Cấu hình i18n với các ngôn ngữ
const resources = {
  en: {
    translation: en
  },
  vi: {
    translation: vi
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng nếu không tìm thấy
    interpolation: {
      escapeValue: false // Tắt escape để sử dụng HTML trong chuỗi ngôn ngữ
    }
  });

export default i18n;
