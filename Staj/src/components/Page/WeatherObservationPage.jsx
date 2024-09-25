import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function WeatherObservationPage() {
  const [formData, setFormData] = useState({
    sampleId: "",
    gunSayisi: "",
    havaDurumu: "",
    ruzgarTuru: "",
    ruzgarHizi: "",
    havaSicakligi: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/hava-gozlemi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      <h2 className="text-lg font-semibold mb-4">Hava Gözlemi</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sampleId" className="block mb-2">
          Sample Id:
        </label>
        <input
          type="number"
          name="sampleId"
          className="w-full p-2 mb-4 border rounded"
          id="sampleId"
          onChange={handleInputChange}
        />

        {/* Gözlem için gün sayısı */}
        <label className="block mb-2">Gözlem için gün sayısı:</label>
        <input
          type="number"
          className="w-full p-2 mb-4 border rounded"
          name="gunSayisi"
          value={formData.gunSayisi}
          onChange={handleInputChange}
        />

        {/* Hava Durumu */}
        <label className="block mb-2">Hava Durumu:</label>
        <div className="mb-4">
          <Select
            onValueChange={(value) => handleSelectChange("havaDurumu", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Hava Durumunu Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="acik">Açık</SelectItem>
              <SelectItem value="parcaliBulutlu">Parçalı Bulutlu</SelectItem>
              <SelectItem value="bulutlu">Bulutlu</SelectItem>
              <SelectItem value="yagisli">Yağışlı</SelectItem>
              <SelectItem value="karli">Karlı</SelectItem>
              <SelectItem value="firtinali">Fırtınalı</SelectItem>
              <SelectItem value="sisli">Sisli</SelectItem>
              <SelectItem value="dolu">Dolu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rüzgar Türü */}
        <label className="block mb-2">Rüzgar Türü:</label>
        <div className="mb-4">
          <Select
            onValueChange={(value) => handleSelectChange("ruzgarTuru", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Rüzgar Türünü Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="karayel">Karayel</SelectItem>
              <SelectItem value="poyraz">Poyraz</SelectItem>
              <SelectItem value="lodos">Lodos</SelectItem>
              <SelectItem value="kuzeyRuzgari">Kuzey Rüzgarı</SelectItem>
              <SelectItem value="guneyRuzgari">Güney Rüzgarı</SelectItem>
              <SelectItem value="batiRuzgari">Batı Rüzgarı</SelectItem>
              <SelectItem value="doguRuzgari">Doğu Rüzgarı</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rüzgar Hızı Gözlemi */}
        <label className="block mb-2">Rüzgar Hızı Gözlemi:</label>
        <div className="mb-4">
          <Select
            onValueChange={(value) => handleSelectChange("ruzgarHizi", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Rüzgar Hızını Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8ms">8 m/s</SelectItem>
              <SelectItem value="8to10ms">8-10 m/s</SelectItem>
              <SelectItem value="10to15ms">10-15 m/s</SelectItem>
              <SelectItem value="15to20ms">15-20 m/s</SelectItem>
              <SelectItem value="20msveUzeri">20 m/s ve üzeri</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Hava Sıcaklık Gözlemi */}
        <label className="block mb-2">Hava Sıcaklık Gözlemi:</label>
        <div className="mb-4">
          <Select
            onValueChange={(value) =>
              handleSelectChange("havaSicakligi", value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sıcaklığı Seçiniz" />
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 active:bg-blue-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default WeatherObservationPage;
