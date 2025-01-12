import { modlar } from "./veri.js";

function UIGoster() {
    // state
    let premiumKullanici = false;
    let calmaListesi = []

    const kokEleman = document.querySelector("#root");
    const baslikElemani = document.createElement("h1");
    const modListesiElemani = document.createElement("div");
    modListesiElemani.id = "mod-listesi";

    baslikElemani.textContent = "ModApp v.1.0.0";
    kokEleman.append(baslikElemani);
    kokEleman.append(modListesiElemani);

    const bodyElemani = document.querySelector("body");
    const calmaListesiElemani = document.createElement("div");
    calmaListesiElemani.id = "calma-listesi";
    bodyElemani.append(calmaListesiElemani);

    modlar.forEach((mod) => {
        // Mod resmi ve ismi için div elemanı oluşturuluyor.
        const modElemani = document.createElement("div");
        modElemani.className = "mod";
        modListesiElemani.append(modElemani);

        // Mod ismi için h2 elemanı oluşturuluyor.
        const modAdiElemani = document.createElement("h2");
        modAdiElemani.textContent = mod.modAdi;
        modElemani.append(modAdiElemani);

        // Mod resmi için img elemanı oluşturuluyor.
        const modGorselElemani = document.createElement("img");
        modGorselElemani.src = `./img/${mod.modAdi}.jpg`;
        modElemani.append(modGorselElemani);

        // mod sesi için audio elemani oluşturuluyor
        const sesElemani = document.createElement("audio");
        sesElemani.src = `./audio/${mod.modAdi}-sound.mp3`;
        sesElemani.loop = true

        // Mod div elemanı için tıklama olayı ekleniyor.
        modElemani.addEventListener("click", () => {
            if (sesElemani.paused) {
                sesElemani.play();
                modElemani.classList.add("aktif-mod"); // mod div elemanına aktif-mod css clası ekleniyor
                calmaListesi.push(mod.modAdi); // Çalma listesine mod adı ekleniyor
            } else {
                sesElemani.pause();
                modElemani.classList.remove("aktif-mod"); // mod div elemanından aktif-mod css clası kaldırılıyor
                calmaListesi = calmaListesi.filter((calinanMod) => calinanMod !== mod.modAdi);
            }
            calmaListesiGoster(calmaListesi);
        });
    });

}

UIGoster()

function calmaListesiGoster(calmaListesi) {
    const calmaListesiElemani = document.querySelector("#calma-listesi");
    calmaListesiElemani.innerHTML = ""; // Çalma listesi elemanının içeriği temizleniyor
    calmaListesi.forEach((calinanMod) => {
        const calinanModElemani = document.createElement("p"); // çalma listesi elemanı için p elemanı eklendi
        calinanModElemani.textContent = calinanMod; // çalınan modun adı p elemanuna ekleniyor
        calmaListesiElemani.append(calinanModElemani);
    });

    const toplamModElemani = document.createElement("p"); 
    toplamModElemani.className = "mod-sayisi";
    toplamModElemani.textContent = calmaListesi.length + " mod çalınıyor"; 
    calmaListesiElemani.append(toplamModElemani);
}