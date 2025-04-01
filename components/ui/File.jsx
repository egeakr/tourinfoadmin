export default function File({ onChange }) {
    return (
      <input
      type="file"
      onChange={handleFileChange}
      accept="image/*" // Sadece resim dosyalarını kabul et
      multiple // Birden fazla dosya seçmeye izin ver
      />
    );
  }