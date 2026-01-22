const STORAGE_KEY = "intelVaultDB";
const SESSION_KEY = "loggedIn";

const demoImage =
  "data:image/svg+xml;base64," +
  btoa(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='420'>
      <rect width='600' height='420' fill='#0e1418'/>
      <rect x='30' y='30' width='540' height='360' fill='#121c22' stroke='#3af6e0' stroke-width='2'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#3af6e0' font-family='monospace' font-size='20'>ID PHOTO // PLACEHOLDER</text>
    </svg>`
  );

const demoEmployees = () => {
  const template = [
    {
      id: "EMP-2026-00041",
      personalnummer: "10441",
      name: { vorname: "Anna", nachname: "Müller" },
      geburtsdatum: "1992-05-14",
      kontakt: { email: "anna.mueller@example", telefon: "+49 30 441122" },
      adresse: { strasse: "Sonnenweg 12", plz: "10115", ort: "Berlin", land: "DE" },
      job: {
        abteilung: "TECH",
        position: "Analyst",
        standort: "Berlin",
        eintritt: "2023-01-02",
        status: "ACTIVE",
        beschaeftigung: "VOLLZEIT",
        wochenstunden: 40,
        vorgesetzter: "EMP-2020-00001",
      },
      security: {
        clearance: "CONFIDENTIAL",
        badgeId: "BADGE-8891",
        accessZones: ["A1", "B2"],
      },
      flags: ["WATCHLIST"],
      notes: "Internal note // monitoring flagged intel source.",
    },
    {
      id: "EMP-2026-00022",
      personalnummer: "10222",
      name: { vorname: "Jonas", nachname: "Weber" },
      geburtsdatum: "1988-11-22",
      kontakt: { email: "jonas.weber@example", telefon: "+49 40 221133" },
      adresse: { strasse: "Hafenring 7", plz: "20457", ort: "Hamburg", land: "DE" },
      job: {
        abteilung: "OPS",
        position: "Field Lead",
        standort: "Hamburg",
        eintritt: "2020-08-12",
        status: "ACTIVE",
        beschaeftigung: "VOLLZEIT",
        wochenstunden: 42,
        vorgesetzter: "EMP-2019-00003",
      },
      security: {
        clearance: "SECRET",
        badgeId: "BADGE-5521",
        accessZones: ["B1", "C2"],
      },
      flags: [],
      notes: "Strike team rotations updated weekly.",
    },
    {
      id: "EMP-2026-00013",
      personalnummer: "10113",
      name: { vorname: "Lea", nachname: "Nguyen" },
      geburtsdatum: "1994-03-09",
      kontakt: { email: "lea.nguyen@example", telefon: "+49 89 551122" },
      adresse: { strasse: "Parkallee 23", plz: "80331", ort: "München", land: "DE" },
      job: {
        abteilung: "INTEL",
        position: "Signal Analyst",
        standort: "München",
        eintritt: "2021-05-19",
        status: "ON HOLD",
        beschaeftigung: "TEILZEIT",
        wochenstunden: 32,
        vorgesetzter: "EMP-2018-00009",
      },
      security: {
        clearance: "TOP SECRET",
        badgeId: "BADGE-7773",
        accessZones: ["A1", "A2", "D1"],
      },
      flags: ["SUSPENDED"],
      notes: "Access suspended pending review.",
    },
    {
      id: "EMP-2026-00057",
      personalnummer: "10557",
      name: { vorname: "Mila", nachname: "Schmidt" },
      geburtsdatum: "1985-09-12",
      kontakt: { email: "mila.schmidt@example", telefon: "+49 69 555010" },
      adresse: { strasse: "Taunusstr. 9", plz: "60311", ort: "Frankfurt", land: "DE" },
      job: {
        abteilung: "FIN",
        position: "Budget Officer",
        standort: "Frankfurt",
        eintritt: "2019-02-14",
        status: "ON HOLD",
        beschaeftigung: "VOLLZEIT",
        wochenstunden: 38,
        vorgesetzter: "EMP-2017-00004",
      },
      security: {
        clearance: "CONFIDENTIAL",
        badgeId: "BADGE-3348",
        accessZones: ["C1"],
      },
      flags: [],
      notes: "Awaiting clearance renewal.",
    },
    {
      id: "EMP-2026-00031",
      personalnummer: "10331",
      name: { vorname: "Karim", nachname: "Haddad" },
      geburtsdatum: "1982-07-01",
      kontakt: { email: "karim.haddad@example", telefon: "+49 211 889900" },
      adresse: { strasse: "Königsallee 5", plz: "40212", ort: "Düsseldorf", land: "DE" },
      job: {
        abteilung: "OPS",
        position: "Logistics",
        standort: "Düsseldorf",
        eintritt: "2018-11-03",
        status: "FLAGGED",
        beschaeftigung: "VOLLZEIT",
        wochenstunden: 40,
        vorgesetzter: "EMP-2016-00007",
      },
      security: {
        clearance: "SECRET",
        badgeId: "BADGE-2199",
        accessZones: ["B2", "C3"],
      },
      flags: ["WATCHLIST", "FINANCE"],
      notes: "Financial anomalies flagged.",
    },
    {
      id: "EMP-2026-00088",
      personalnummer: "10888",
      name: { vorname: "Sofia", nachname: "Marin" },
      geburtsdatum: "1990-12-30",
      kontakt: { email: "sofia.marin@example", telefon: "+49 221 775599" },
      adresse: { strasse: "Domweg 18", plz: "50667", ort: "Köln", land: "DE" },
      job: {
        abteilung: "HR",
        position: "Coordinator",
        standort: "Köln",
        eintritt: "2022-04-10",
        status: "FLAGGED",
        beschaeftigung: "VOLLZEIT",
        wochenstunden: 36,
        vorgesetzter: "EMP-2017-00002",
      },
      security: {
        clearance: "CONFIDENTIAL",
        badgeId: "BADGE-4481",
        accessZones: ["A2"],
      },
      flags: ["PERSONAL"],
      notes: "Pending HR investigation.",
    },
    {
      id: "EMP-2026-00005",
      personalnummer: "10005",
      name: { vorname: "Elena", nachname: "Fischer" },
      geburtsdatum: "1979-06-17",
      kontakt: { email: "elena.fischer@example", telefon: "+49 351 882244" },
      adresse: { strasse: "Altmarkt 11", plz: "01067", ort: "Dresden", land: "DE" },
      job: {
        abteilung: "INTEL",
        position: "Archivist",
        standort: "Dresden",
        eintritt: "2015-01-07",
        status: "ARCHIVED",
        beschaeftigung: "VOLLZEIT",
        wochenstunden: 40,
        vorgesetzter: "EMP-2014-00001",
      },
      security: {
        clearance: "SECRET",
        badgeId: "BADGE-1101",
        accessZones: ["A1", "B1"],
      },
      flags: [],
      notes: "Retired - archival file only.",
    },
    {
      id: "EMP-2026-00077",
      personalnummer: "10777",
      name: { vorname: "Luca", nachname: "Bianchi" },
      geburtsdatum: "1986-01-25",
      kontakt: { email: "luca.bianchi@example", telefon: "+49 341 551199" },
      adresse: { strasse: "Ringstrasse 6", plz: "04109", ort: "Leipzig", land: "DE" },
      job: {
        abteilung: "TECH",
        position: "Systems Engineer",
        standort: "Leipzig",
        eintritt: "2016-09-20",
        status: "ARCHIVED",
        beschaeftigung: "VOLLZEIT",
        wochenstunden: 40,
        vorgesetzter: "EMP-2012-00010",
      },
      security: {
        clearance: "CONFIDENTIAL",
        badgeId: "BADGE-3390",
        accessZones: ["B1"],
      },
      flags: [],
      notes: "File archived for compliance.",
    },
  ];

  return template.map((emp, index) => {
    const timestamp = Date.now() - index * 86400000;
    return {
      ...emp,
      akten: [
        {
          docId: "DOC-001",
          title: "PERSONNEL FILE // SUMMARY",
          type: "text",
          contentHtml:
            `<p>Subject ${emp.name.vorname} ${emp.name.nachname} assigned to ${emp.job.abteilung} division.</p>` +
            "<p>Redactions present for source protection ████████.</p>",
          redactions: [{ kind: "text", hash: "hash-001", rangeHint: "line 2" }],
          updatedAt: timestamp,
        },
        {
          docId: "DOC-INC-01",
          title: "INCIDENT REPORT // OPS LOG",
          type: "text",
          contentHtml:
            "<p>Incident log references location ██ █████ and contact ████████.</p>",
          redactions: [{ kind: "text", hash: "hash-002", rangeHint: "line 1" }],
          updatedAt: timestamp,
        },
        {
          docId: "DOC-IMG-01",
          title: "ID PHOTO",
          type: "image",
          imageDataUrl: demoImage,
          boxes: [
            { x: 160, y: 90, w: 140, h: 40 },
            { x: 220, y: 220, w: 120, h: 55 },
          ],
          updatedAt: timestamp,
        },
      ],
      audit: [{ ts: timestamp, action: "CREATED", by: "CONSOLE" }],
    };
  });
};

const createDemoDB = () => ({
  employees: demoEmployees(),
  settings: { theme: "CIA_DARK", sound: false },
});

const loadDB = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const demo = createDemoDB();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    return demo;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    const demo = createDemoDB();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
    return demo;
  }
};

const saveDB = (db) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

const getEmployeeById = (db, id) =>
  db.employees.find((emp) => emp.id === id);

const badgeClass = (status) =>
  status ? status.toLowerCase().replace(" ", "-") : "";

const formatDate = (value) =>
  new Date(value).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const showToast = (message) => {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 2400);
};

const requireSession = () => {
  if (sessionStorage.getItem(SESSION_KEY) !== "1") {
    window.location.href = "index.html";
  }
};

const exportJson = (filename, data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

const exportText = (filename, content, mime = "text/plain") => {
  const blob = new Blob([content], { type: mime });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
};

const getQueryParam = (key) =>
  new URLSearchParams(window.location.search).get(key);

const updateClock = () => {
  const clock = document.querySelector("[data-clock]");
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const initGlobal = () => {
  updateClock();
  setInterval(updateClock, 1000 * 20);
  document.querySelectorAll("[data-lock]").forEach((btn) => {
    btn.addEventListener("click", () => {
      sessionStorage.removeItem(SESSION_KEY);
    });
  });
};

const initLogin = () => {
  const loginForm = document.querySelector("[data-login]");
  const dashboard = document.querySelector("[data-dashboard]");
  const lockBtn = document.querySelector("[data-lock]");

  const showDashboard = () => {
    loginForm?.classList.add("no-print");
    loginForm?.setAttribute("hidden", "hidden");
    dashboard?.removeAttribute("hidden");
  };

  if (sessionStorage.getItem(SESSION_KEY) === "1") {
    showDashboard();
  }

  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    sessionStorage.setItem(SESSION_KEY, "1");
    showDashboard();
    window.location.href = "verwaltung.html";
  });

  lockBtn?.addEventListener("click", () => {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = "index.html";
  });
};

const initDashboard = () => {
  const db = loadDB();
  const stats = {
    total: db.employees.length,
    active: db.employees.filter((e) => e.job.status === "ACTIVE").length,
    flagged: db.employees.filter((e) => e.job.status === "FLAGGED").length,
    recent: db.employees
      .flatMap((e) => e.audit.map((a) => ({ ...a, emp: e })))
      .sort((a, b) => b.ts - a.ts)
      .slice(0, 5),
  };

  document.querySelector("[data-stat='total']").textContent = stats.total;
  document.querySelector("[data-stat='active']").textContent = stats.active;
  document.querySelector("[data-stat='flagged']").textContent = stats.flagged;
  document.querySelector("[data-stat='recent']").textContent = stats.recent.length;

  const recentList = document.querySelector("[data-recent]");
  if (recentList) {
    recentList.innerHTML = "";
    stats.recent.forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = `${entry.emp.id} // ${entry.action} // ${formatDate(entry.ts)}`;
      recentList.appendChild(li);
    });
  }
};

const initVerwaltung = () => {
  requireSession();
  const db = loadDB();
  const searchInput = document.querySelector("[data-filter='search']");
  const statusSelect = document.querySelector("[data-filter='status']");
  const siteSelect = document.querySelector("[data-filter='site']");
  const flaggedToggle = document.querySelector("[data-filter='flagged']");
  const tableBody = document.querySelector("[data-table]");
  const exportDbButton = document.querySelector("[data-export-db]");
  const importDbButton = document.querySelector("[data-import-db]");
  const importFileInput = document.querySelector("[data-import-file]");

  const uniqueSites = [...new Set(db.employees.map((e) => e.job.standort))];
  uniqueSites.forEach((site) => {
    const option = document.createElement("option");
    option.value = site;
    option.textContent = site;
    siteSelect.appendChild(option);
  });

  const render = () => {
    const search = searchInput.value.toLowerCase();
    const status = statusSelect.value;
    const site = siteSelect.value;
    const flaggedOnly = flaggedToggle.checked;

    const filtered = db.employees.filter((emp) => {
      const matchesSearch =
        emp.id.toLowerCase().includes(search) ||
        emp.personalnummer.toLowerCase().includes(search) ||
        `${emp.name.vorname} ${emp.name.nachname}`
          .toLowerCase()
          .includes(search) ||
        emp.job.abteilung.toLowerCase().includes(search);
      const matchesStatus = !status || emp.job.status === status;
      const matchesSite = !site || emp.job.standort === site;
      const matchesFlagged = !flaggedOnly || emp.job.status === "FLAGGED";
      return matchesSearch && matchesStatus && matchesSite && matchesFlagged;
    });

    tableBody.innerHTML = "";
    filtered.forEach((emp) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.personalnummer}</td>
        <td>${emp.name.vorname} ${emp.name.nachname}</td>
        <td>${emp.job.abteilung}</td>
        <td>${emp.job.position}</td>
        <td>${emp.job.standort}</td>
        <td><span class="badge ${badgeClass(emp.job.status)}">${emp.job.status}</span></td>
        <td>
          <a class="button secondary" href="akte.html?id=${emp.id}">OPEN</a>
          <a class="button secondary" href="editor.html?emp=${emp.id}">EDIT</a>
          <button class="button" data-action="archive" data-id="${emp.id}">ARCHIVE</button>
          <button class="button danger" data-action="delete" data-id="${emp.id}">DELETE</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  };

  document.querySelectorAll("[data-filter]").forEach((el) =>
    el.addEventListener("input", render)
  );

  tableBody.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const id = button.dataset.id;
    const action = button.dataset.action;
    const employee = getEmployeeById(db, id);
    if (!employee) return;
    if (action === "archive") {
      employee.job.status = "ARCHIVED";
      employee.audit.push({ ts: Date.now(), action: "ARCHIVED", by: "CONSOLE" });
      saveDB(db);
      showToast("FILE ARCHIVED");
      render();
    }
    if (action === "delete") {
      if (!confirm("DELETE FILE HANDLE?")) return;
      db.employees = db.employees.filter((emp) => emp.id !== id);
      saveDB(db);
      showToast("FILE REMOVED");
      render();
    }
  });

  render();

  exportDbButton?.addEventListener("click", () => {
    exportJson("intel-vault-db.json", db);
    showToast("PACKAGE EXPORTED");
  });

  importDbButton?.addEventListener("click", () => {
    importFileInput?.click();
  });

  importFileInput?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed?.employees || !Array.isArray(parsed.employees)) {
          throw new Error("Invalid DB");
        }
        saveDB(parsed);
        showToast("DB IMPORTED");
        window.location.reload();
      } catch (error) {
        showToast("IMPORT FAILED");
      }
    };
    reader.readAsText(file);
  });
};

const initAkte = () => {
  requireSession();
  const db = loadDB();
  const id = getQueryParam("id");
  if (!id) {
    document.querySelector("[data-error]").textContent =
      "NO FILE HANDLE PROVIDED";
    return;
  }
  const employee = getEmployeeById(db, id);
  if (!employee) {
    document.querySelector("[data-error]").textContent = "FILE HANDLE NOT FOUND";
    return;
  }

  document.querySelector("[data-emp-name]").textContent =
    `${employee.name.vorname} ${employee.name.nachname}`;
  document.querySelector("[data-emp-id]").textContent = employee.id;
  document.querySelector("[data-emp-status]").textContent = employee.job.status;
  document.querySelector("[data-emp-status]").classList.add(
    badgeClass(employee.job.status)
  );
  document.querySelector("[data-emp-clearance]").textContent =
    employee.security.clearance;
  document.querySelector("[data-emp-flags]").textContent =
    employee.flags.join(" / ") || "NONE";

  const setText = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.textContent = value;
  };

  setText("[data-identity='dob']", employee.geburtsdatum);
  setText("[data-identity='pnr']", employee.personalnummer);
  setText("[data-contact='mail']", employee.kontakt.email);
  setText("[data-contact='phone']", employee.kontakt.telefon);
  setText(
    "[data-contact='address']",
    `${employee.adresse.strasse}, ${employee.adresse.plz} ${employee.adresse.ort}`
  );
  setText("[data-job='division']", employee.job.abteilung);
  setText("[data-job='role']", employee.job.position);
  setText("[data-job='site']", employee.job.standort);
  setText("[data-job='status']", employee.job.status);
  setText("[data-sec='badge']", employee.security.badgeId);
  setText(
    "[data-sec='zones']",
    employee.security.accessZones.join(", ")
  );

  const docsList = document.querySelector("[data-docs]");
  docsList.innerHTML = "";
  employee.akten.forEach((doc) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.className = "button secondary";
    link.textContent = `${doc.title} (${doc.type})`;
    link.href =
      doc.type === "image"
        ? `bilder.html?emp=${employee.id}&doc=${doc.docId}`
        : `editor.html?emp=${employee.id}&doc=${doc.docId}`;
    li.appendChild(link);
    docsList.appendChild(li);
  });

  const auditBody = document.querySelector("[data-audit]");
  auditBody.innerHTML = "";
  employee.audit
    .slice()
    .sort((a, b) => b.ts - a.ts)
    .forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${formatDate(entry.ts)}</td>
        <td>${entry.action}</td>
        <td>${entry.by}</td>
      `;
      auditBody.appendChild(row);
    });

  document.querySelector("[data-export]").addEventListener("click", () => {
    exportJson(`${employee.id}.json`, employee);
    showToast("PACKAGE EXPORTED");
  });

  document.querySelector("[data-print]").addEventListener("click", () => {
    window.print();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "p") {
      window.print();
    }
  });
};

const initEditor = () => {
  requireSession();
  const db = loadDB();
  const empId = getQueryParam("emp");
  const docId = getQueryParam("doc");
  const employee = getEmployeeById(db, empId);
  const surface = document.querySelector("[data-editor]");
  const docList = document.querySelector("[data-doclist]");

  if (!employee) {
    document.querySelector("[data-error]").textContent = "NO FILE HANDLE PROVIDED";
    return;
  }

  let activeDoc = employee.akten.find((doc) => doc.docId === docId) ||
    employee.akten.find((doc) => doc.type === "text");

  if (!activeDoc) {
    document.querySelector("[data-error]").textContent = "DOCUMENT MISSING";
    return;
  }

  const renderDocList = () => {
    docList.innerHTML = "";
    employee.akten
      .filter((doc) => doc.type === "text")
      .forEach((doc) => {
        const button = document.createElement("button");
        button.className =
          doc.docId === activeDoc.docId ? "button" : "button secondary";
        button.textContent = doc.title;
        button.addEventListener("click", () => {
          activeDoc = doc;
          renderActiveDoc();
          renderDocList();
        });
        docList.appendChild(button);
      });
  };

  const renderActiveDoc = () => {
    surface.innerHTML = activeDoc.contentHtml || "";
    document.querySelector("[data-doc-title]").textContent = activeDoc.title;
  };

  const saveDoc = (action = "UPDATED", notify = true) => {
    activeDoc.contentHtml = surface.innerHTML;
    activeDoc.updatedAt = Date.now();
    employee.audit.push({ ts: Date.now(), action, by: "CONSOLE" });
    saveDB(db);
    if (notify) {
      showToast("FILE SAVED LOCALLY");
    }
  };

  const redactSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (!surface.contains(range.commonAncestorContainer)) return;
    const span = document.createElement("span");
    span.className = "redacted";
    const length = Math.max(4, Math.floor(Math.random() * 12));
    span.textContent = "█".repeat(length);
    range.deleteContents();
    range.insertNode(span);
    selection.removeAllRanges();
    saveDoc("REDACTED");
  };

  document.querySelector("[data-redact]").addEventListener("click", redactSelection);
  document.querySelector("[data-stamp]").addEventListener("click", () => {
    const stamp = document.createElement("div");
    stamp.className = "stamp";
    stamp.textContent = "CLASSIFIED";
    surface.prepend(stamp);
    saveDoc("STAMPED");
  });
  document.querySelector("[data-save]").addEventListener("click", () => saveDoc());
  document.querySelector("[data-export-txt]").addEventListener("click", () => {
    const text = surface.textContent;
    exportText(`${employee.id}-${activeDoc.docId}.txt`, text, "text/plain");
    showToast("PACKAGE EXPORTED");
  });
  document.querySelector("[data-export-html]").addEventListener("click", () => {
    exportText(
      `${employee.id}-${activeDoc.docId}.html`,
      surface.innerHTML,
      "text/html"
    );
    showToast("PACKAGE EXPORTED");
  });

  surface.addEventListener("input", () => saveDoc("UPDATED", false));

  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === "s") {
      event.preventDefault();
      saveDoc();
    }
    if (event.key.toLowerCase() === "r") {
      redactSelection();
    }
  });

  renderDocList();
  renderActiveDoc();
};

const initImageRedactor = () => {
  requireSession();
  const db = loadDB();
  const empId = getQueryParam("emp");
  const docId = getQueryParam("doc");
  const employee = getEmployeeById(db, empId);
  const canvas = document.querySelector("canvas");
  const ctx = canvas?.getContext("2d");
  if (!employee) {
    document.querySelector("[data-error]").textContent = "NO FILE HANDLE PROVIDED";
    return;
  }
  const doc = employee.akten.find((d) => d.docId === docId && d.type === "image") ||
    employee.akten.find((d) => d.type === "image");
  if (!doc) {
    document.querySelector("[data-error]").textContent = "DOCUMENT MISSING";
    return;
  }

  const state = {
    drawing: false,
    startX: 0,
    startY: 0,
    boxes: doc.boxes ? [...doc.boxes] : [],
    addStamp: false,
  };

  const image = new Image();
  image.src = doc.imageDataUrl;

  const draw = () => {
    if (!ctx) return;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = "#000";
    state.boxes.forEach((box) => {
      ctx.fillRect(box.x, box.y, box.w, box.h);
    });
    if (state.addStamp) {
      ctx.strokeStyle = "#ff4d5a";
      ctx.lineWidth = 3;
      ctx.strokeRect(40, 40, 200, 60);
      ctx.fillStyle = "#ff4d5a";
      ctx.font = "20px monospace";
      ctx.fillText("CLASSIFIED", 58, 78);
    }
  };

  image.onload = () => draw();

  const toCanvasPoint = (event) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  canvas.addEventListener("mousedown", (event) => {
    const point = toCanvasPoint(event);
    state.drawing = true;
    state.startX = point.x;
    state.startY = point.y;
  });

  canvas.addEventListener("mousemove", (event) => {
    if (!state.drawing) return;
    draw();
    const point = toCanvasPoint(event);
    const w = point.x - state.startX;
    const h = point.y - state.startY;
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(state.startX, state.startY, w, h);
  });

  canvas.addEventListener("mouseup", (event) => {
    if (!state.drawing) return;
    state.drawing = false;
    const point = toCanvasPoint(event);
    const w = point.x - state.startX;
    const h = point.y - state.startY;
    state.boxes.push({
      x: Math.min(state.startX, point.x),
      y: Math.min(state.startY, point.y),
      w: Math.abs(w),
      h: Math.abs(h),
    });
    doc.boxes = [...state.boxes];
    doc.updatedAt = Date.now();
    employee.audit.push({ ts: Date.now(), action: "IMAGE REDACTED", by: "CONSOLE" });
    saveDB(db);
    draw();
  });

  document.querySelector("[data-undo]").addEventListener("click", () => {
    state.boxes.pop();
    doc.boxes = [...state.boxes];
    saveDB(db);
    draw();
  });

  document.querySelector("[data-clear]").addEventListener("click", () => {
    state.boxes = [];
    doc.boxes = [];
    saveDB(db);
    draw();
  });

  document.querySelector("[data-stamp]").addEventListener("change", (event) => {
    state.addStamp = event.target.checked;
    draw();
  });

  document.querySelector("[data-export]").addEventListener("click", () => {
    draw();
    const link = document.createElement("a");
    link.download = `${employee.id}-${doc.docId}-redacted.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("PACKAGE EXPORTED");
  });
};

const initInformation = () => {
  requireSession();
};

const initPage = () => {
  initGlobal();
  const page = document.body.dataset.page;
  if (page === "index") {
    initLogin();
    initDashboard();
  }
  if (page === "verwaltung") initVerwaltung();
  if (page === "akte") initAkte();
  if (page === "editor") initEditor();
  if (page === "bilder") initImageRedactor();
  if (page === "informationen") initInformation();
};

document.addEventListener("DOMContentLoaded", initPage);
