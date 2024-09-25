import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Shadcn UI Select importları

function AgricultureObservationPage() {
  const [values, setValues] = useState({
    sampleId: "",
    ilacAdi: "",
    tarih: "",
    dozMiktari: "",
    fenolojikEvre: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/savasim-gozlemi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Veri başarıyla gönderildi:", data);
      } else {
        console.error("Veri gönderme hatası:", data);
      }
    } catch (error) {
      console.error("Ağ hatası:", error);
    }
  };

  return (
    <div className="form-container bg-white p-5 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Tarımsal Savaşım Gözlemi</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sampleId" className="block mb-2">
          Sample Id:
        </label>
        <input
          type="number"
          name="sampleId"
          className="w-full p-2 mb-4 border rounded"
          id="sampleId"
          onChange={handleChange}
        />
        {/* Kullanılan İlaç İsmi */}
        <label className="block mb-2" htmlFor="ilacAdi">
          Kullanılan İlaç İsmi Giriniz:
        </label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          name="ilacAdi"
          onChange={handleChange}
        />

        {/* Tarih */}
        <label className="block mb-2" htmlFor="tarih">
          Tarih Giriniz:
        </label>
        <input
          type="date"
          className="w-full p-2 mb-4 border rounded"
          name="tarih"
          onChange={handleChange}
        />

        {/* Doz Miktarı */}
        <label className="block mb-2" htmlFor="dozMiktari">
          Kullanılan Doz Miktarını Giriniz:
        </label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          name="dozMiktari"
          onChange={handleChange}
        />

        {/* Fenolojik Evre */}
        <label className="block mb-2" htmlFor="fenolojikEvre">
          Fenolojik Evre:
        </label>
        <div className="mb-4">
          <Select
            onValueChange={(value) =>
              handleSelectChange("fenolojikEvre", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Fenolojik Evre Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kisGozleri">
                Kış Gözleri Uyanıyor Başlangıç
              </SelectItem>
              <SelectItem value="yesilNokta">
                Yeşil Noktalar Belirginleşti
              </SelectItem>
              <SelectItem value="yaprak">
                Yaprak Yarıp Uçları İki İle Göründü
              </SelectItem>
              <SelectItem value="cicekTomurcugu">
                Çiçek Tomurcukları Belirginleşti
              </SelectItem>
              <SelectItem value="ciceklenme">Çiçeklenme Tamamlandı</SelectItem>
              <SelectItem value="tamCicek">Tam Çiçek</SelectItem>
              <SelectItem value="taneTutumu">Tane Tutumu</SelectItem>
              <SelectItem value="benDusme">Ben Düşme</SelectItem>
              <SelectItem value="hasat">Hasat</SelectItem>
              <SelectItem value="yaprakDokulme">Yaprak Dökülme</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded active:bg-blue-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AgricultureObservationPage;
