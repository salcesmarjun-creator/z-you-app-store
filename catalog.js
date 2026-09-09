/*
  Z YOU APP STORE CATALOG
  -----------------------
  Current launch catalog: Mini Grocery POS + School Face Attendance.
  Public download buttons are enabled only after verified binaries are published.
  Product source repositories and owner license tools remain private.
*/

window.APP_CATALOG = [
  {
    id: "mini-grocery-pos",
    name: "Z You Mini Grocery POS",
    icon: "🛒",
    platforms: ["windows", "android"],
    version: "POS 1.6 · 7-Day Trial · Scanner 1.2",
    category: "Business",
    featured: true,
    description: "Point-of-sale and inventory system for mini groceries, with sales reports and an Android barcode scanner companion. Includes a 7-day free trial on the Windows POS, then requires a 1-month or 1-year subscription.",
    installNote: "Windows: extract the portable ZIP, then open the included launcher/start file. The 7-day trial begins on first use. After the trial, activate a 1-month or 1-year subscription. Android: install the scanner APK and connect it to the licensed/trial Windows POS on the same local network.",
    downloads: [
      {
        label: "Windows POS V1.6",
        platform: "Windows",
        file: null,
        url: null,
        size: "Public installer publishing",
        available: false
      },
      {
        label: "Android Scanner V1.2",
        platform: "Android",
        file: null,
        url: null,
        size: "Public APK publishing",
        available: false
      }
    ]
  },
  {
    id: "school-attendance",
    name: "Z You School Face Attendance",
    icon: "🎓",
    platforms: ["windows", "android"],
    version: "1.4 · 7-Day Trial",
    category: "Education",
    featured: true,
    description: "Face-recognition school attendance system with Windows server/dashboard, Android face scanner, attendance records, schedule controls, guardian SMS workflow, and a 7-day free trial followed by 1-month or 1-year subscription licensing.",
    installNote: "Windows: the new 7-day-trial server build has passed the build/smoke-test pipeline and is awaiting public distribution hosting. Android: the V1.4 APK is the companion scanner and connects to the licensed/trial Windows attendance server.",
    downloads: [
      {
        label: "Windows System V1.4 — 7-Day Trial",
        platform: "Windows",
        file: null,
        url: null,
        size: "Public release pending",
        available: false
      },
      {
        label: "Android Scanner V1.4",
        platform: "Android",
        file: null,
        url: null,
        size: "Public APK publishing",
        available: false
      }
    ]
  }
];
