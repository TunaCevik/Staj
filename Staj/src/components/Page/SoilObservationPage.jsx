import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SoilObservationPage() {
  const [values, setValues] = useState({
    sampleId: "",
    toprakNem: "",
    toprakNemIcerigi: "",
    gobreKirlilik: "",
    toprakSicaklik: "",
    suDoygunluk: "",
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
      const response = await fetch("http://localhost:5000/toprak-gozlemi", {
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
      <h2 className="text-lg font-semibold mb-4">Toprak Gözlemi</h2>
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
        {/* Toprak Nem Gözlemi */}
        <label className="block mb-2">Toprak Nem Gözlemi:</label>
        <div className="mb-4">
          <Select
            onValueChange={(value) => handleSelectChange("toprakNem", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Toprak Nem Durumunu Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kuru">Kuru</SelectItem>
              <SelectItem value="nemli">Nemli</SelectItem>
              <SelectItem value="cokNemli">Çok Nemli</SelectItem>
              <SelectItem value="balcik">Balçık</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Toprak Nem İçeriği (Volümetrik Su İçeriği) */}
        <label className="block mb-2">
          Toprak Nem İçeriği (Volümetrik Su İçeriği):
        </label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          name="toprakNemIcerigi"
          onChange={handleChange}
        />

        {/* Toprak Göbre Kirlilik Gözlemi */}
        <label className="block mb-2">Toprak Göbre Kirlilik Gözlemi:</label>
        <div className="mb-4">
          <Select
            onValueChange={(value) =>
              handleSelectChange("gobreKirlilik", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Toprak Göbre Kirlilik Durumunu Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yok">Yok</SelectItem>
              <SelectItem value="az">Az</SelectItem>
              <SelectItem value="orta">Orta</SelectItem>
              <SelectItem value="cok">Çok</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Toprak Sıcaklık Gözlemi */}
        <label className="block mb-2">Toprak Sıcaklık Gözlemi:</label>
        <div className="mb-4">
          <Select
            onValueChange={(value) =>
              handleSelectChange("toprakSicaklik", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Toprak Sıcaklık Durumunu Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0to6">0-6 °C</SelectItem>
              <SelectItem value="6to10">6-10 °C</SelectItem>
              <SelectItem value="10to15">10-15 °C</SelectItem>
              <SelectItem value="15to20">15-20 °C</SelectItem>
              <SelectItem value="20veUzeri">20 °C ve üzeri</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Toprak Su Doygunluk Gözlemi */}
        <label className="block mb-2">Toprak Su Doygunluk Gözlemi:</label>
        <div className="mb-4">
          <Select
            onValueChange={(value) => handleSelectChange("suDoygunluk", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Toprak Su Doygunluk Durumunu Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="doymamis">Doymamış</SelectItem>
              <SelectItem value="doymus">Doymuş</SelectItem>
              <SelectItem value="asiriDoymus">Aşırı Doymuş</SelectItem>
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

export default SoilObservationPage;
