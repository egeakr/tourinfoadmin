// components/Admin/index.jsx
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import File from "../../components/ui/File";

import Link from "next/link";
import Image from "next/image";
import "./adminstyles.css";
import { handleFileChange } from "../../utils/fileHandlers"; // handleFileChange fonksiyonunu import et

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
      data.append("mahalle", formData.kategori);
      data.append("sokak", formData.baslik);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);
      data.append("description", formData.description);

    if (formData.files && formData.files.length > 0) {
      formData.files.forEach((file, index) => {
        data.append(`files`, file); // Her dosyayı FormData'ya ekle
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {" "}
        {/* Container genişliği 1280px */}
        {/* Logo ve Başlık */}
        <div className="text-center mb-16">
          <Image
            src="/tourİnfo.png"
            width={160}
            height={160}
            alt="Logo"
            className="logo"
          />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Yeni Lokasyon Ekle
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Turistik noktaları kolayca sisteme ekleyin
          </p>
        </div>
        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12 lg:p-16">
            {" "}
            {/* İç boşlukları artırma */}
            <form onSubmit={handleSubmit} className="space-y-10">
              {" "}
              {/* Boşlukları artırma */}
              {/* Grid Sistemi - 3 Sütun */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* İl */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    İl <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="il"
                    value={formData.il}
                    onChange={handleChange}
                    placeholder="Örn: İstanbul"
                  />
                </div>

                {/* İlçe */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    İlçe <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="ilce"
                    value={formData.ilce}
                    onChange={handleChange}
                    placeholder="Örn: Kadıköy"
                  />
                </div>

                {/* Mahalle */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    kategori <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="kategori"
                    value={formData.mahalle}
                    onChange={handleChange}
                    placeholder="Örn: Moda"
                  />
                </div>

                {/* Sokak */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    baslik <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="baslik"
                    value={formData.sokak}
                    onChange={handleChange}
                    placeholder="Örn: Moda Caddesi"
                  />
                </div>

                {/* Enlem */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Enlem <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    placeholder="40.7128"
                    type="number"
                    step="any"
                  />
                </div>

                {/* Boylam */}
                <div className="space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Boylam <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    placeholder="-74.0060"
                    type="number"
                    step="any"
                  />
                </div>
              </div>
              {/* Dosya Yükleme Alanı */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-colors">
                <input
                  type="file"
                  onChange={onFileChange}
                  accept="image/*"
                  multiple
                  className="opacity-0 absolute w-0 h-0"
                  id="fileInput"
                />

                <label
                  htmlFor="fileInput"
                  className="cursor-pointer flex flex-col items-center space-y-4"
                >
                  {/* <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg> 
              <span className="text-lg  font-medium text-gray-600">
                Dosyaları sürükleyin veya tıklayın
              </span>*/}
                  <span className="text-sm text-gray-500">
                    PNG, JPG, JPEG (Maks. 10MB)
                  </span>
                </label>
              </div>
              {/* Açıklama */}
              <div className="space-y-2">
                <label className="block text-lg font-medium text-gray-700">
                  Detaylı Açıklama
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Bu lokasyonla ilgili detaylı bilgiler..."
                  rows="6"
                />
              </div>
              {/* Buton */}
              <div className="pt-8">
                <Button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-xl transform hover:scale-101 transition-all"
                >
                  <span className="drop-shadow-md">Lokasyonu Kaydet</span>
                </Button>
              </div>
            </form>
            <div>
              <h1>Admin Paneli</h1>
              <button onClick={handleGoToDataCorrection}>
                Veri Düzeltme Sayfasına Git
              </button>
            </div>
            {/* <button
              onClick={() => router.push("../../app/test/data/index.jsx")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Düzeltme Sayfasına Git
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
