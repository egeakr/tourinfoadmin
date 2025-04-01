/**
 * Dosya seçimi sırasında tetiklenen fonksiyon.
 * Seçilen dosyaları alır ve state'e ekler.
 * @param {Event} e - Dosya seçim olayı
 * @param {Function} setFormData - State güncelleme fonksiyonu
 */
// utils/fileHandlers.js
export const handleFileChange = (e, setFormData) => {
  const files = e.target.files; // Seçilen dosyalar
  if (files && files.length > 0) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: Array.from(files), // Dosyaları state'e ekle
    }));
  }
};
  /**
   * Dosyaları FormData nesnesine ekler.
   * @param {FormData} formData - FormData nesnesi
   * @param {Array} files - Yüklenen dosyalar
   */
  export const appendFilesToFormData = (formData, files) => {
    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append(`files`, file); // Her dosyayı FormData'ya ekle
      });
    }
  };
  
  /**
   * Dosyaların boyutunu kontrol eder.
   * @param {Array} files - Yüklenen dosyalar
   * @param {number} maxSize - Maksimum dosya boyutu (MB cinsinden)
   * @returns {boolean} - Dosya boyutu sınırı aşılıyorsa false, aksi halde true
   */
  export const checkFileSize = (files, maxSize) => {
    const maxSizeInBytes = maxSize * 1024 * 1024; // MB'ı byte'a çevir
    for (const file of files) {
      if (file.size > maxSizeInBytes) {
        return false; // Dosya boyutu sınırı aşılıyor
      }
    }
    return true; // Tüm dosyalar sınırın altında
  };
  
  /**
   * Dosyaların türünü kontrol eder.
   * @param {Array} files - Yüklenen dosyalar
   * @param {Array} allowedTypes - İzin verilen dosya türleri (örneğin, ["image/jpeg", "image/png"])
   * @returns {boolean} - Dosya türü uygun değilse false, aksi halde true
   */
  export const checkFileType = (files, allowedTypes) => {
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return false; // Dosya türü uygun değil
      }
    }
    return true; // Tüm dosyalar uygun türde
  };