require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// MySQL bağlantısı
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL bağlantı hatası:", err);
    return;
  }
  console.log("MySQL'e başarıyla bağlanıldı");
});

// Toprak Gözlemi POST (toprak-gozlemi)
app.post("/toprak-gozlemi", (req, res) => {
  const {
    sampleId,
    toprakNem,
    toprakNemIcerigi,
    gobreKirlilik,
    toprakSicaklik,
    suDoygunluk,
  } = req.body;
  const sql = `INSERT INTO toprak_gozlemi (sampleId, toprakNem, toprakNemIcerigi, gobreKirlilik, toprakSicaklik, suDoygunluk) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      sampleId,
      toprakNem,
      toprakNemIcerigi,
      gobreKirlilik,
      toprakSicaklik,
      suDoygunluk,
    ],
    (err, result) => {
      if (err) {
        console.error("SQL Hatası:", err);
        return res
          .status(500)
          .json({ error: "Veritabanına ekleme hatası", details: err });
      }
      res.json({ message: "Toprak gözlemi başarıyla kaydedildi" });
    }
  );
});

// Tarımsal Savaşım Gözlemi POST (savasim-gozlemi)
app.post("/savasim-gozlemi", (req, res) => {
  const { sampleId, ilacAdi, tarih, dozMiktari, fenolojikEvre } = req.body;
  const sql = `INSERT INTO tarimsal_savasim_gozlemi (sampleId, ilacAdi, tarih, dozMiktari, fenolojikEvre) VALUES (?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [sampleId, ilacAdi, tarih, dozMiktari, fenolojikEvre],
    (err, result) => {
      if (err) {
        console.error("SQL Hatası:", err);
        return res
          .status(500)
          .json({ error: "Veritabanına ekleme hatası", details: err });
      }
      res.json({ message: "Tarımsal savaşım gözlemi başarıyla kaydedildi" });
    }
  );
});

// Bitki Gözlemi POST (bitki-gozlemi)
app.post("/bitki-gozlemi", (req, res) => {
  const {
    sampleId,
    shootLength,
    bunchLength,
    fruitAnswer,
    bunchCount,
    thousandGrainWeight,
    nutrientDeficiency,
    deficientElement,
    selectedDiseases,
    homogeneousDevelopment,
  } = req.body;
  const selectedDiseasesString = JSON.stringify(selectedDiseases); // Diziyi JSON'a çeviriyoruz
  const sql = `INSERT INTO bitki_gozlemi (sampleId, shootLength, bunchLength, fruitAnswer, bunchCount, thousandGrainWeight, nutrientDeficiency, deficientElement, selectedDiseases, homogeneousDevelopment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      sampleId,
      shootLength,
      bunchLength,
      fruitAnswer,
      bunchCount,
      thousandGrainWeight,
      nutrientDeficiency,
      deficientElement,
      selectedDiseasesString,
      homogeneousDevelopment,
    ],
    (err, result) => {
      if (err) {
        console.error("SQL Hatası:", err);
        return res
          .status(500)
          .json({ error: "Veritabanına ekleme hatası", details: err });
      }
      res.json({ message: "Bitki gözlemi başarıyla kaydedildi" });
    }
  );
});

// Sulama Gözlemi POST (sulama-gozlemi)
app.post("/sulama-gozlemi", (req, res) => {
  const {
    sampleId,
    waterGiven,
    waterGivenDate,
    fertigationDone,
    fertigationDate,
    fertilizerUsed,
    fertilizerAmount,
  } = req.body;
  const sql = `INSERT INTO sulama_gozlemi (sampleId, waterGiven, waterGivenDate, fertigationDone, fertigationDate, fertilizerUsed, fertilizerAmount) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      sampleId,
      waterGiven,
      waterGivenDate,
      fertigationDone,
      fertigationDate,
      fertilizerUsed,
      fertilizerAmount,
    ],
    (err, result) => {
      if (err) {
        console.error("SQL Hatası:", err);
        return res
          .status(500)
          .json({ error: "Veritabanına ekleme hatası", details: err });
      }
      res.json({ message: "Sulama gözlemi başarıyla kaydedildi" });
    }
  );
});

// Hava Gözlemi POST (hava-gozlemi)
app.post("/hava-gozlemi", (req, res) => {
  const {
    sampleId,
    gunSayisi,
    havaDurumu,
    ruzgarTuru,
    ruzgarHizi,
    havaSicakligi,
  } = req.body;
  const sql = `INSERT INTO hava_gozlemi (sampleId, gunSayisi, havaDurumu, ruzgarTuru, ruzgarHizi, havaSicakligi) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [sampleId, gunSayisi, havaDurumu, ruzgarTuru, ruzgarHizi, havaSicakligi],
    (err, result) => {
      if (err) {
        console.error("SQL Hatası:", err);
        return res
          .status(500)
          .json({ error: "Veritabanına ekleme hatası", details: err });
      }
      res.json({ message: "Hava gözlemi başarıyla kaydedildi" });
    }
  );
});

// Sunucu başlatma
app.listen(5000, () => {
  console.log("Backend sunucusu 5000 portunda çalışıyor");
});
