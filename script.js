document.getElementById("mainTitle").innerText = אתה שמן";
// יוצר המבורגרים מסתובבים בלייב ברקע
(function createBurgers() {
  const layer = document.getElementById("burger-layer");
  if (!layer) return;

  const COUNT = 12; // לפחות 10
  layer.innerHTML = "";

  for (let i = 0; i < COUNT; i++) {
    const b = document.createElement("div");
    b.className = "burger";
    b.textContent = "🍔";

    // מיקום אקראי לרוחב
    const left = Math.random() * 100; // %
    b.style.left = `${left}%`;

    // התחלה אקראית כדי שלא כולם יעלו יחד
    const delay = -(Math.random() * 12); // שלילי כדי להתחיל "באמצע"
    b.style.animationDelay = `${delay}s, ${delay}s`;

    // משך תנועה/סיבוב אקראיים
    const dur = 10 + Math.random() * 10;   // 10-20 שניות
    const spin = 2 + Math.random() * 4;    // 2-6 שניות
    b.style.setProperty("--dur", `${dur}s`);
    b.style.setProperty("--spin", `${spin}s`);

    // גודל אקראי
    const size = 34 + Math.random() * 34;  // 34-68px
    b.style.fontSize = `${Math.round(size)}px`;

    // שקיפות אקראית קלה
    const op = 0.12 + Math.random() * 0.18; // 0.12-0.30
    b.style.opacity = op.toFixed(2);

    layer.appendChild(b);
  }
})();

function calculate() {
  const sex = document.getElementById("sex").value;
  const age = Number(document.getElementById("age").value);
  const height = Number(document.getElementById("height").value); // ס"מ
  const weight = Number(document.getElementById("weight").value); // ק"ג
  const activity = Number(document.getElementById("activity").value);

  const result = document.getElementById("result");

  // ולידציה בסיסית
  if (!age || age < 10 || age > 120) {
    result.innerText = "אנא הכנס גיל תקין (10–120).";
    return;
  }
  if (!height || height < 100 || height > 230) {
    result.innerText = "אנא הכנס גובה תקין (100–230 ס״מ).";
    return;
  }
  if (!weight || weight < 30 || weight > 300) {
    result.innerText = "אנא הכנס משקל תקין (30–300 ק״ג).";
    return;
  }

  // Mifflin–St Jeor:
  // גבר: BMR = 10w + 6.25h - 5a + 5
  // אישה: BMR = 10w + 6.25h - 5a - 161
  let bmr = 10 * weight + 6.25 * height - 5 * age + (sex === "male" ? 5 : -161);

  const tdee = bmr * activity;                 // קלוריות לתחזוקה
  const cut = tdee * 0.85;                     // 15% גרעון לירידה
  const lossRangeLow = tdee * 0.80;            // 20% גרעון (אגרסיבי יותר)
  const lossRangeHigh = tdee * 0.90;           // 10% גרעון (עדין יותר)

  const round = (x) => Math.round(x);

  result.innerHTML = `
    <div style="text-align:right">
      <div>🔹 <b>BMR</b> (בסיס): ${round(bmr)} קל׳</div>
      <div>🔹 <b>TDEE</b> (תחזוקה): ${round(tdee)} קל׳</div>
      <hr>
      <div>✅ יעד ירידה מומלץ (≈15% גרעון): <b>${round(cut)}</b> קל׳ ליום</div>
      <div style="margin-top:8px;">טווח אפשרי: ${round(lossRangeLow)}–${round(lossRangeHigh)} קל׳ ליום</div>
      <hr>
      <div><b>המלצה תזונתית כללית:</b></div>
      <div>• חלבון בכל ארוחה • ירקות חופשי • פחמימות במידה • שתייה ללא סוכר</div>
    </div>
  `;
}
