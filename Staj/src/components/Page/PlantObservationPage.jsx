import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function PlantObservationPage() {
  // State to hold form data
  const [formData, setFormData] = useState({
    sampleId: "",
    shootLength: "",
    bunchLength: "",
    fruitAnswer: null,
    bunchCount: "",
    thousandGrainWeight: "",
    nutrientDeficiency: null,
    deficientElement: "",
    selectedDiseases: [],
    homogeneousDevelopment: "",
  });

  const diseases = [
    { id: "hastalik-yok", label: "Hastalık yok" },
    { id: "bag-kullemesi", label: "Bağ Küllemesi" },
    { id: "bag-mildiyosu", label: "Bağ Mildiyosu" },
    { id: "olu-kol", label: "Ölü Kol" },
    { id: "kursuni-kuf", label: "Kurşuni Küf" },
    { id: "salkim-guvesi", label: "Salkım Güvesi" },
    { id: "bag-tirtili", label: "Bağ Tırtılı" },
    { id: "bag-sirke-sinegi", label: "Bağ Sirke Sineği" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDiseaseChange = (diseaseId) => {
    setFormData((prevData) => {
      const isSelected = prevData.selectedDiseases.includes(diseaseId);
      const selectedDiseases = isSelected
        ? prevData.selectedDiseases.filter((id) => id !== diseaseId)
        : [...prevData.selectedDiseases, diseaseId];

      return { ...prevData, selectedDiseases };
    });
  };

  const renderQuestion = (
    question,
    answer,
    integerLabel1,
    integerName1,
    integerLabel2,
    integerName2
  ) => (
    <AccordionItem value={question}>
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${question}-yes`}
              checked={answer === "yes"}
              onCheckedChange={() =>
                setFormData((prevData) => ({ ...prevData, fruitAnswer: "yes" }))
              }
            />
            <Label htmlFor={`${question}-yes`}>Evet</Label>
          </div>
          {answer === "yes" && (
            <>
              <div className="space-y-2">
                <Label htmlFor={`${question}-integer-1`}>{integerLabel1}</Label>
                <Input
                  type="number"
                  id={`${question}-integer-1`}
                  name={integerName1}
                  value={formData[integerName1]}
                  onChange={handleInputChange}
                  placeholder="Salkımdaki tane sayısını giriniz"
                  step="1"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${question}-integer-2`}>{integerLabel2}</Label>
                <Input
                  type="number"
                  id={`${question}-integer-2`}
                  name={integerName2}
                  value={formData[integerName2]}
                  onChange={handleInputChange}
                  placeholder="Bin tane ağırlığını giriniz"
                  step="0.01"
                  min="0"
                />
              </div>
            </>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${question}-no`}
              checked={answer === "no"}
              onCheckedChange={() =>
                setFormData((prevData) => ({ ...prevData, fruitAnswer: "no" }))
              }
            />
            <Label htmlFor={`${question}-no`}>Hayır</Label>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  const renderNutrientDeficiencyQuestion = (
    question,
    answer,
    inputLabel,
    inputName
  ) => (
    <AccordionItem value={question}>
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${question}-yes`}
              checked={answer === "yes"}
              onCheckedChange={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  nutrientDeficiency: "yes",
                }))
              }
            />
            <Label htmlFor={`${question}-yes`}>Evet</Label>
          </div>
          {answer === "yes" && (
            <div className="space-y-2">
              <Label htmlFor={`${question}-input`}>{inputLabel}</Label>
              <Input
                type="text"
                id={`${question}-input`}
                name={inputName}
                value={formData[inputName]}
                onChange={handleInputChange}
                placeholder="Eksik Besin Elementini Giriniz"
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${question}-no`}
              checked={answer === "no"}
              onCheckedChange={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  nutrientDeficiency: "no",
                }))
              }
            />
            <Label htmlFor={`${question}-no`}>Hayır</Label>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/bitki-gozlemi", {
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
      <h2 className="text-lg font-semibold mb-6">Bitki Gözlemi</h2>
      <form className="flex flex-col items-start" onSubmit={handleSubmit}>
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
        {/* Sürgün Boyu */}
        <label className="block mb-2">Sürgün Boyu (Cm):</label>
        <Input
          type="number"
          name="shootLength"
          value={formData.shootLength}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        />

        {/* Salkım Uzunluğu */}
        <label className="block mb-2">Salkım Uzunluğu (Cm):</label>
        <Input
          type="number"
          name="bunchLength"
          value={formData.bunchLength}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <Accordion type="single" collapsible className="w-full mb-6">
          {renderQuestion(
            "Bağda Meyve Var mı?",
            formData.fruitAnswer,
            "Salkımdaki Ortalama Tane sayısını giriniz.",
            "bunchCount",
            "Bin Tane Ağırlığını Giriniz.",
            "thousandGrainWeight"
          )}
          {renderNutrientDeficiencyQuestion(
            "Besin Elementi Eksikliği",
            formData.nutrientDeficiency,
            "Eksik Besin Elementini Giriniz.",
            "deficientElement"
          )}
        </Accordion>

        {/* Bitki Hastalık Gözlemi */}
        <div className="mb-6 w-full">
          <label className="block mb-2 font-semibold"></label>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="disease-observation">
              <AccordionTrigger>Bitki Hastalık Gözlemi</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {diseases.map((disease) => (
                    <div
                      key={disease.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={disease.id}
                        checked={formData.selectedDiseases.includes(disease.id)}
                        onCheckedChange={() => handleDiseaseChange(disease.id)}
                        disabled={
                          disease.id !== "no-disease" &&
                          formData.selectedDiseases.includes("no-disease")
                        }
                      />
                      <Label htmlFor={disease.id}>{disease.label}</Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Homojen Gelişme Var mı? */}
        <div className="mb-6 w-full">
          <label className="block mb-2 font-semibold">
            Homojen Gelişme Var mı?
          </label>
          <div className="mb-4 w-full">
            <Select
              value={formData.homogeneousDevelopment}
              onValueChange={(value) =>
                setFormData((prevData) => ({
                  ...prevData,
                  homogeneousDevelopment: value,
                }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Homojen Gelişme Durumunu Seçiniz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yok">Yok</SelectItem>
                <SelectItem value="az">Az</SelectItem>
                <SelectItem value="orta">Orta</SelectItem>
                <SelectItem value="cokIyi">Çok İyi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <Button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg active:bg-blue-200"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PlantObservationPage;
