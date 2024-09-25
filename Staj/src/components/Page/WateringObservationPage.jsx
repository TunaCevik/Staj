import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function WateringObservationPage() {
  // State to hold form data
  const [formData, setFormData] = useState({
    sampleId: "",
    waterGiven: null,
    waterGivenDate: "",
    fertigationDone: null,
    fertigationDate: "",
    fertilizerUsed: "",
    fertilizerAmount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/sulama-gozlemi", {
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

  const renderWateringQuestion = (question, answer, dateLabel) => (
    <AccordionItem value={question}>
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${question}-yes`}
              checked={answer === true}
              onCheckedChange={() => handleCheckboxChange("waterGiven", true)}
            />
            <Label htmlFor={`${question}-yes`}>Evet</Label>
          </div>
          {answer === true && (
            <div className="space-y-2">
              <Label htmlFor={`${question}-date`}>{dateLabel}</Label>
              <Input
                type="date"
                id={`${question}-date`}
                name="waterGivenDate"
                value={formData.waterGivenDate}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${question}-no`}
              checked={answer === false}
              onCheckedChange={() => handleCheckboxChange("waterGiven", false)}
            />
            <Label htmlFor={`${question}-no`}>Hayır</Label>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  const renderFertigationQuestion = (
    question,
    answer,
    dateLabel,
    fertilizerLabel,
    amountLabel
  ) => (
    <AccordionItem value={question}>
      <AccordionTrigger>{question}</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${question}-yes`}
              checked={answer === true}
              onCheckedChange={() =>
                handleCheckboxChange("fertigationDone", true)
              }
            />
            <Label htmlFor={`${question}-yes`}>Evet</Label>
          </div>
          {answer === true && (
            <>
              <div className="space-y-2">
                <Label htmlFor={`${question}-date`}>{dateLabel}</Label>
                <Input
                  type="date"
                  id={`${question}-date`}
                  name="fertigationDate"
                  value={formData.fertigationDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${question}-fertilizer`}>
                  {fertilizerLabel}
                </Label>
                <Input
                  type="text"
                  id={`${question}-fertilizer`}
                  name="fertilizerUsed"
                  value={formData.fertilizerUsed}
                  onChange={handleInputChange}
                  placeholder="Kullanılan Gübre/Besleyici Giriniz"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`${question}-amount`}>{amountLabel}</Label>
                <Input
                  type="text"
                  id={`${question}-amount`}
                  name="fertilizerAmount"
                  value={formData.fertilizerAmount}
                  onChange={handleInputChange}
                  placeholder="Kullanılan gübre miktarı ve birim giriniz"
                />
              </div>
            </>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`${question}-no`}
              checked={answer === false}
              onCheckedChange={() =>
                handleCheckboxChange("fertigationDone", false)
              }
            />
            <Label htmlFor={`${question}-no`}>Hayır</Label>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <div className="form-container bg-white p-5 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">
        Sulama ve Bitki Besleme Gözlemi
      </h2>
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
        <Accordion type="single" collapsible className="w-full mb-4">
          {/* Bitkiye Su Verildi mi? */}
          {renderWateringQuestion(
            "Bitkiye Su Verildi mi?",
            formData.waterGiven,
            "Tarih Giriniz"
          )}
          {/* Fertigasyon Yapıldı mı? */}
          {renderFertigationQuestion(
            "Fertigasyon Yapıldı mı?",
            formData.fertigationDone,
            "Tarih Giriniz",
            "Kullanılan Gübre/Besleyici Giriniz",
            "Kullanılan Gübre Miktarı ve Birim Giriniz"
          )}
        </Accordion>

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

export default WateringObservationPage;
