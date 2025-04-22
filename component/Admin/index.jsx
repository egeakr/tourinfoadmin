import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import Image from "next/image";
// import styles from "./adminstyles.css"; // CSS Modules için güncellendi
import { handleFileChange } from "../../utils/fileHandlers";

export async function getServerSideProps() {
  return { props: {} };
}

export default function Admin() {
  const [formData, setFormData] = useState({
    il: "",
    ilce: "",
    kategori: "",
    baslik: "",
    latitude: "",
    longitude: "",
    description: "",
    files: [], // Dosyaları saklamak için bir dizi
  });
  
  const router = useRouter();

  const handleGoToDataCorrection = () => {
    router.push("/test/data"); // Sayfa yönlendirmesi
  };

  const onFileChange = (e) => {
    handleFileChange(e, setFormData); // handleFileChange fonksiyonunu çağır
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("il", formData.il);
    data.append("ilce", formData.ilce);
    data.append("kategori", formData.kategori);
    data.append("baslik", formData.baslik);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);
    data.append("description", formData.description);

    if (formData.files && formData.files.length > 0) {
      formData.files.forEach((file) => {
        data.append("files", file); // Her dosyayı FormData'ya ekle
      });
    }

    try {
      const response = await fetch("/api/location", {
        method: "POST",
        body: data, // JSON yerine FormData gönder
      });

      const result = await response.json();
      if (response.ok) {
        alert("Veri başarıyla kaydedildi!");
      } else {
        alert("Hata oluştu: " + result.message);
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };


  return (
    <div >
      <div >
        <div >
          <Image
            src="/tourİnfo.png"
            width={160}
            height={160}
            alt="Logo"
           
          />
          <h1 >Yeni Lokasyon Ekle</h1>
          <p >Turistik noktaları kolayca sisteme ekleyin</p>
        </div>

        <form onSubmit={handleSubmit} >
          <div c>
            {["il", "ilce", "kategori", "baslik", "latitude", "longitude"].map((field) => (
              <div key={field} >
                <label >
                  {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                  <span >*</span>
                </label>
                <Input
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Örn: ${
                    field === "latitude"
                      ? "40.7128"
                      : field === "longitude"
                      ? "-74.0060"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }`}
                  type={["latitude", "longitude"].includes(field) ? "number" : "text"}
                  step={["latitude", "longitude"].includes(field) ? "any" : undefined}
                />
              </div>
            ))}

            <div >
              <input
                type="file"
                onChange={onFileChange}
                accept="image/*"
                multiple
                id="fileInput"
                
              />
              <label htmlFor="fileInput" >
                PNG, JPG, JPEG (Maks. 10MB)
              </label>
            </div>

            <div >
              <label >Detaylı Açıklama</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Bu lokasyonla ilgili detaylı bilgiler..."
                rows={6}
              />
            </div>
          </div>

          <Button type="submit" >
            Lokasyonu Kaydet
          </Button>
        </form>

        <div >
          <h2>Admin Paneli</h2>
          <Button variant="secondary" onClick={handleGoToDataCorrection}>
            Veri Düzeltme Sayfasına Git
          </Button>
        </div>
      </div>
    </div>
  );
}