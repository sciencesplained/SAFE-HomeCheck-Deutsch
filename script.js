// SAFE Home Check – Separation & Alone-Time Feelings Evaluation
// Grundlogik für Fragebogen + PDF-Ausgabe

// --- Daten: Abschnitt 1, Fragen 1–30 (aus deiner Excel uebernommen) ---

const abschnitt1Fragen = [
  { id: 1,  kategorie: "Furcht/Angst/Stres", text: "Winselt, bellt oder heult" },
  { id: 2,  kategorie: "", text: "Laeuft hin und her, rastlos, entspannt sich nicht nicht" },
  { id: 3,  kategorie: "", text: "Zittert" },
  { id: 4,  kategorie: "", text: "Hechelt" },
  { id: 5,  kategorie: "", text: "Speichelt oder erbricht sich" },
  { id: 6,  kategorie: "", text: "Leckt sich oder beisst sich" },
  { id: 7,  kategorie: "", text: "Ist extrem passiv – z.B. bleibt im Hundekorb oder auf seinem Platz, ohne wegzugehen" },
  { id: 8,  kategorie: "", text: "Bleibt nahe an der Tuer von der du das Haus verlassen hast" },
  { id: 9,  kategorie: "Fluchtversuche", text: "Springt hoch oder kratzt an der Tuer oder dem Tuerrahmen durch den du das Haus verlassen hast" },
  { id: 10, kategorie: "", text: "Springt hoch oder kratzt an dem Fenster, durch den dein Hund dich hat weggehen sehen" },
  { id: 11, kategorie: "", text: "Falls dein Hund in einer Hundebox ist: Kratzt oder beisst an der Hundebox, dem Gitter, Boden oder den Waenden  oder versucht, sich herauszudraengen" },
  { id: 12, kategorie: "Zerstoerung von Gegenstaenden", text: "Nimmt kleine oder mittelgrosse Gegenstaende ins Maul oder kaut sie" },
  { id: 13, kategorie: "", text: "Nimmt kleine oder mittelgrosse Gegenstaende ins Maul und spielt mit ihnen, mit oder ohne Zerstoerung" },
  { id: 14, kategorie: "", text: "Kratzt oder kaut grosse, weiche Gegenstaende, z.B. Sofa oder Kissen" },
  { id: 15, kategorie: "Urin-und Kotabsatz", text: "Setzt Urin im Haus ab" },
  { id: 16, kategorie: "", text: "Setzt Kot im Haus ab" },
  { id: 17, kategorie: "Reaktion auf aeussere Reize (z.B. Menschen, Hunde, Katzen, Geraeusche). Wenn moeglich, notiere worauf dein Hund reagiert", text: "Als Reaktion auf aussere Reize:\nErschreckt sich und beruhigt sich nicht innerhalb von wenigen Minuten" },
  { id: 18, kategorie: "", text: "Als Reaktion auf aussere Reize:\nWinselt, bellt oder heult fuer mehrer Minuten" },
  { id: 19, kategorie: "", text: "Als Reaktion auf aussere Reize:\nNimmt kleine oder mittelgrosse Gegenstaende ins Maul" },
  { id: 20, kategorie: "", text: "Als Reaktion auf aussere Reize:\nKratzt oder kaut grosse, weiche Gegenstaende, z.B. Sofa oder Kissen" },
  { id: 21, kategorie: "", text: "Als Reaktion auf aussere Reize:\nSpringt hoch an Fenster oder Tuer oder kratzt" },
  { id: 22, kategorie: "Fressverhalten", text: "Frisst Futter in der Wohnung, waehrend du ausser Haus waere (z.B. Futter aus einem Futterspielzeug oder Kaustange)" },
  { id: 23, kategorie: "", text: "Waehrend des Fressens in meiner Abwesenheit scheint mein Hund entspannt zu sein. Wenn fertig mit Fressen, zeigt Furcht, Angst, Stress" },
  { id: 24, kategorie: "Andere Ursachen", text: "Urin- oder Kotabsatz in der Wohnung tritt nicht nur auf wenn dein Hund alleine ist, sondern auch, wenn du zu Hause bist " },
  { id: 25, kategorie: "", text: "Zerstoert Gegenstaende, sowohl wenn dein Hund alleine ist, als auch, wenn du zu Hause bist" },
  { id: 26, kategorie: "", text: "Die Trennungsprobleme meines Hundes sind mehr oder weniger stark ausgepraegt, je nachdem wie viel Auslastung er hatte" },
  { id: 27, kategorie: "", text: "Die Trennungsprobleme meines Hundes sind mehr oder weniger stark ausgepraegt, je nachdem zu welcher Tageszeit ich ihn alleine lasse" },
  { id: 28, kategorie: "", text: "Mein Hund hat ein Gesundheitsproblem, dass ihm Unbehagen, Juckreiz oder Schmerzen bereitet " },
  { id: 29, kategorie: "", text: "Der Gesundheitszustand meines Hundes hat sich kuerzlich verschlechtert" },
  { id: 30, kategorie: "", text: "Mein Hund hat in letzter Zeit eine wichtige Veraenderung in seiner Umgebung erlebt (z.B. Umzug oder Verlust eines Familienmitglieds)" }
];

// Antwortskala aus deiner Excel (Abschnitt 1) – volle, sehr ausführliche Labels
// (Hier 6 Optionen; fuer andere Abschnitte bitte jeweils die Originalskalen aus der Excel uebernehmen.)
const abschnitt1Skala = [
  "Fuer 5-30 Minuten, dann beruhigt mein Hund sich.",
  "Fuer laenger als 30 Minuten.",
  "Ab und zu.  Dazwischen entspannt sich mein Hund.",
  "Nie.",
  "Mein Hund zeigt dieses Verhalten, aber ich weiss nicht wann.",
  "Ich bin mir nicht sicher."
];

// --- Fragebogen-Seiten definieren ---
// Aktuell: Meta + Abschnitt 1 (1–30). Spaeter: weitere Abschnitte 2–6 hier ergaenzen.

const pages = [
  {
    id: "details",
    type: "meta",
    title: "Angaben zu dir und deinem Hund",
    fields: [
      { id: "ownerName",   label: "Dein Name", type: "text",   required: true },
      { id: "email",       label: "E-Mail-Adresse", type: "email", required: true },
      { id: "dogName",     label: "Name deines Hundes", type: "text", required: true },
      { id: "dogAge",      label: "Alter deines Hundes (z.B. 3 Jahre)", type: "text", required: false },
      { id: "breed",       label: "Rasse / Typ (z.B. Mischling)", type: "text", required: false },
      {
        id: "consentMain",
        label: "Ich willige ein, dass meine Angaben gespeichert und zur Erstellung eines Verhaltensberichts fuer meinen Hund genutzt werden.",
        type: "checkbox",
        required: true
      },
      {
        id: "consentContact",
        label: "Ich bin einverstanden, dass ich per E-Mail zu Rueckfragen oder passenden Angeboten kontaktiert werde.",
        type: "checkbox",
        required: false
      }
    ]
  },
  {
    id: "alone1",
    type: "likert",
    title: "Abschnitt 1 – Verhalten alleine zu Hause (Fragen 1–14)",
    stem: "Wie lange oder wie regelmaessig zeigt dein Hund das folgende Verhalten, wenn er alleine zu Hause ist?",
    questions: abschnitt1Fragen.filter(q => q.id >= 1 && q.id <= 14),
    scale: abschnitt1Skala
  },
  {
    id: "alone2",
    type: "likert",
    title: "Abschnitt 1 – Verhalten alleine zu Hause (Fragen 15–30)",
    stem: "Bitte bewerte, wie stark diese Aussagen auf deinen Hund zutreffen.",
    questions: abschnitt1Fragen.filter(q => q.id >= 15 && q.id <= 30),
    scale: abschnitt1Skala
  }
  // TODO: Abschnitte 2–6 mit Fragen 31–49 + ihren jeweiligen Originalskalen aus der Excel hinzufuegen
];

// --- Zustand / Antworten ---

let currentPageIndex = 0;
const antworten = {
  meta: {},
  items: {} // z.B. { "1": "0", "2": "3", ... } (Index in der Skala)
};

// --- Rendering-Funktionen ---

function renderPage() {
  const container = document.getElementById("questionnaireContainer");
  container.innerHTML = "";

  const page = pages[currentPageIndex];

  const h2 = document.createElement("h2");
  h2.textContent = page.title;
  container.appendChild(h2);

  if (page.type === "meta") {
    renderMetaPage(container, page);
  } else if (page.type === "likert") {
    renderLikertPage(container, page);
  }

  updateNavButtons();
}

function renderMetaPage(container, page) {
  const form = document.createElement("div");
  form.className = "meta-form";

  page.fields.forEach(field => {
    const wrapper = document.createElement("div");
    wrapper.className = "meta-field";

    const label = document.createElement("label");
    label.setAttribute("for", field.id);
    label.textContent = field.label + (field.required ? " *" : "");

    if (field.type === "checkbox") {
      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = field.id;
      input.name = field.id;
      if (antworten.meta[field.id]) {
        input.checked = true;
      }
      wrapper.appendChild(input);
      wrapper.appendChild(label);
    } else {
      const input = document.createElement("input");
      input.type = field.type;
      input.id = field.id;
      input.name = field.id;
      if (antworten.meta[field.id]) {
        input.value = antworten.meta[field.id];
      }
      wrapper.appendChild(label);
      wrapper.appendChild(input);
    }

    form.appendChild(wrapper);
  });

  const hint = document.createElement("p");
  hint.className = "required-hint";
  hint.textContent = "* Pflichtfelder";
  form.appendChild(hint);

  container.appendChild(form);
}

function renderLikertPage(container, page) {
  const stemP = document.createElement("p");
  stemP.className = "question-stem";
  stemP.textContent = page.stem;
  container.appendChild(stemP);

  const legend = document.createElement("p");
  legend.className = "scale-legend";
  legend.textContent = "Bitte jede Frage beantworten. Die Antwortmoeglichkeiten stehen mit vollem Wortlaut in den Spaltenköpfen.";
  container.appendChild(legend);

  // Wrapper für horizontales Scrollen auf kleinen Bildschirmen
  const wrapper = document.createElement("div");
  wrapper.className = "likert-wrapper";

  const table = document.createElement("table");
  table.className = "likert-table";

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  const thNr = document.createElement("th");
  thNr.textContent = "Nr.";
  headRow.appendChild(thNr);

  const thText = document.createElement("th");
  thText.textContent = "Verhalten / Aussage";
  headRow.appendChild(thText);

  page.scale.forEach((label, index) => {
    const th = document.createElement("th");

    // Index + voller Text
    th.innerHTML = `
      <div class="scale-index">${index + 1}.</div>
      <div class="scale-label">${label}</div>
    `;

    headRow.appendChild(th);
  });

  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  page.questions.forEach(q => {
    const tr = document.createElement("tr");

    const tdNr = document.createElement("td");
    tdNr.textContent = q.id;
    tr.appendChild(tdNr);

    const tdText = document.createElement("td");
    if (q.kategorie) {
      const catSpan = document.createElement("div");
      catSpan.className = "kategorie-label";
      catSpan.textContent = q.kategorie;
      tdText.appendChild(catSpan);
    }
    const textSpan = document.createElement("div");
    textSpan.textContent = q.text;
    tdText.appendChild(textSpan);
    tr.appendChild(tdText);

    page.scale.forEach((_, index) => {
      const td = document.createElement("td");
      td.className = "likert-cell";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + q.id;
      input.value = String(index);

      if (antworten.items[q.id] === String(index)) {
        input.checked = true;
      }

      td.appendChild(input);
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  wrapper.appendChild(table);
  container.appendChild(wrapper);
}


// --- Antworten speichern / Validierung ---

function saveCurrentPage() {
  const page = pages[currentPageIndex];

  if (page.type === "meta") {
    const meta = {};
    let valid = true;
    const missingFields = [];

    page.fields.forEach(field => {
      if (field.type === "checkbox") {
        const el = /** @type {HTMLInputElement} */ (document.getElementById(field.id));
        const checked = el ? el.checked : false;
        meta[field.id] = checked;
        if (field.required && !checked) {
          valid = false;
          missingFields.push(field.label);
        }
      } else {
        const el = /** @type {HTMLInputElement} */ (document.getElementById(field.id));
        const value = el ? el.value.trim() : "";
        meta[field.id] = value;
        if (field.required && !value) {
          valid = false;
          missingFields.push(field.label);
        }
      }
    });

    if (!valid) {
      alert("Bitte fuelle alle Pflichtfelder aus und bestaetige die Einwilligung:\n\n" + missingFields.join("\n"));
      return false;
    }

    antworten.meta = meta;
    return true;
  }

  if (page.type === "likert") {
    let allAnswered = true;
    const unanswered = [];

    page.questions.forEach(q => {
      const checked = document.querySelector(`input[name="q${q.id}"]:checked`);
      if (checked) {
        antworten.items[q.id] = checked.value;
      } else {
        allAnswered = false;
        unanswered.push(q.id);
      }
    });

    if (!allAnswered) {
      alert(
        "Bitte beantworte alle Fragen auf dieser Seite, bevor du weitergehst.\n" +
        "Folgende Fragen fehlen noch: " + unanswered.join(", ")
      );
      return false;
    }
    return true;
  }

  return true;
}

// --- Navigation ---

function updateNavButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const showReportBtn = document.getElementById("showReportBtn");

  prevBtn.style.display = currentPageIndex === 0 ? "none" : "inline-block";
  nextBtn.style.display = currentPageIndex === pages.length - 1 ? "none" : "inline-block";
  showReportBtn.style.display = currentPageIndex === pages.length - 1 ? "inline-block" : "none";
}

function goToNextPage() {
  if (!saveCurrentPage()) return;
  if (currentPageIndex < pages.length - 1) {
    currentPageIndex++;
    renderPage();
  }
}

function goToPrevPage() {
  // optional: auch beim Zurueckspeichern
  saveCurrentPage();
  if (currentPageIndex > 0) {
    currentPageIndex--;
    renderPage();
  }
}

// --- Bericht erzeugen (PDF-Inhalt = ausgefuelltes Formular) ---

function buildReport() {
  if (!saveCurrentPage()) return;

  const wrapper = document.getElementById("reportWrapper");
  const report = document.getElementById("reportContent");
  const dogName = (antworten.meta.dogName || "dein Hund").trim();
  const ownerName = (antworten.meta.ownerName || "").trim();
  const email = (antworten.meta.email || "").trim();
  const dogAge = (antworten.meta.dogAge || "").trim();
  const breed = (antworten.meta.breed || "").trim();

  const today = new Date();
  const dateStr = today.toLocaleDateString("de-DE");

  // Kopfbereich (Banner) + Basisdaten
  let html = `
    <div class="banner">
      <div class="banner-text">
        <h1 class="banner-title">SAFE Home Check</h1>
        <h2 class="banner-subtitle">Separation &amp; Alone-Time Feelings Evaluation</h2>
        <p class="banner-credit">
          © 2025 Alexandra Moesta, Veterinary Behaviourist, DACVB
        </p>
      </div>
      <img src="logoWithLettering.png" alt="Logo" class="banner-logo" />
    </div>

    <p><strong>Datum:</strong> ${dateStr}</p>
    <p>
      <strong>Halterschaft:</strong>
      ${ownerName ? ownerName : "–"}${email ? " &nbsp;|&nbsp; " + email : ""}<br/>
      ${dogName ? "<strong>Hund:</strong> " + dogName : ""}${dogAge ? " (" + dogAge + ")" : ""}${breed ? ", " + breed : ""}
    </p>

    <p>
      Dieses PDF dient als Erinnerung an deine Antworten im SAFE Home Check. Du kannst es waehrend des Kurses nutzen,
      um im Blick zu behalten, welche Situationen fuer deinen Hund besonders herausfordernd sind und welche Inhalte des
      Trainings fuer euch am wichtigsten sind.
    </p>
  `;

  // Fuer jede Likert-Seite: Fragen + gewaehlte Antwort anzeigen
  pages.forEach(page => {
    if (page.type !== "likert") return;

    html += `
      <div class="page-section">
        <h3>${page.title}</h3>
        <p class="question-stem-pdf">${page.stem}</p>
        <table class="result-table">
          <thead>
            <tr>
              <th style="width:40px;">Nr.</th>
              <th>Verhalten / Aussage</th>
              <th style="width:35%;">Deine Antwort</th>
            </tr>
          </thead>
          <tbody>
    `;

    page.questions.forEach(q => {
      const ansIndexStr = antworten.items[q.id];
      const idx = ansIndexStr !== undefined ? parseInt(ansIndexStr, 10) : NaN;
      const label = Number.isNaN(idx) ? "Keine Antwort" : page.scale[idx];

      html += `
        <tr>
          <td>${q.id}</td>
          <td>
            ${q.kategorie ? `<div class="kategorie-label">${q.kategorie}</div>` : ""}
            <div>${q.text.replace(/\n/g, "<br/>")}</div>
          </td>
          <td>${label}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;
  });

  report.innerHTML = html;

  wrapper.style.display = "block";
  document.getElementById("downloadBtn").style.display = "inline-block";
  wrapper.scrollIntoView({ behavior: "smooth" });
}

// --- Initialisierung & PDF-Export ---

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("prevBtn").addEventListener("click", goToPrevPage);
  document.getElementById("nextBtn").addEventListener("click", goToNextPage);
  document.getElementById("showReportBtn").addEventListener("click", buildReport);

  const downloadBtn = document.getElementById("downloadBtn");
  downloadBtn.style.display = "none";
  downloadBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);

    const dogName = (antworten.meta.dogName || "Hund").trim() || "Hund";
    const filename = "SAFE-HomeCheck_" + dogName.replace(/\s+/g, "_") + ".pdf";

    const element = document.getElementById("reportContent");
    html2pdf()
      .set({
        margin: 10,
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollY: 0
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: {
          mode: ["css", "legacy"],
          before: ".page-break-before"
        }
      })
      .from(element)
      .save()
      .catch(err => console.error("PDF error:", err));
  });

  renderPage();
});
