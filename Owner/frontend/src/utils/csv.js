function escapeCell(value) {
  if (value == null) return "";
  const s = typeof value === "string" ? value : String(value);
  if (s.includes(",") || s.includes("\n") || s.includes('"')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export function downloadCSV(filename, rows = []) {
  if (!rows || !rows.length) {
    const blob = new Blob([""], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    return;
  }

  const headers = Array.from(rows.reduce((acc, r) => { Object.keys(r).forEach((k) => acc.add(k)); return acc; }, new Set()));
  const lines = [headers.map(escapeCell).join(",")];
  for (const r of rows) {
    const vals = headers.map((h) => {
      const v = r[h];
      if (Array.isArray(v)) return escapeCell(v.join("; "));
      return escapeCell(v);
    });
    lines.push(vals.join(","));
  }

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function parseCSVText(text) {
  const rows = text.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (!rows.length) return [];
  const headerLine = rows[0];
  const headers = headerLine.split(",").map((h) => h.replace(/^"|"$/g, "").trim());
  const data = [];
  for (let i = 1; i < rows.length; i++) {
    const line = rows[i];
    const cells = [];
    let cur = "";
    let inQuotes = false;
    for (let c = 0; c < line.length; c++) {
      const ch = line[c];
      if (ch === '"') {
        if (inQuotes && line[c + 1] === '"') {
          cur += '"';
          c++; // skip escaped quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === "," && !inQuotes) {
        cells.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    cells.push(cur);

    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      const key = headers[j];
      let val = cells[j] || "";
      val = val.replace(/^"|"$/g, "");
      // coerce numbers when appropriate
      if (/^(qty|price|total|quantity|fillRate|rating|activeOrders)$/i.test(key) && val !== "") {
        const n = Number(val);
        val = Number.isFinite(n) ? n : val;
      }
      // arrays separated by ;
      if (val.includes(";")) val = val.split(";").map((p) => p.trim()).filter(Boolean);
      obj[key] = val;
    }
    data.push(obj);
  }
  return data;
}

export function parseCSVFile(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => {
      try {
        const parsed = parseCSVText(String(fr.result));
        resolve(parsed);
      } catch (e) {
        reject(e);
      }
    };
    fr.onerror = () => reject(fr.error);
    fr.readAsText(file);
  });
}
