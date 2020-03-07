// local helpers
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const getCommentContent = () => {
  const prefixes = [
    "Katıl",
    "Katıl!",
    "Katıldım",
    "Katıldım!",
    "Katil",
    "Katil!",
    "Katiliyorum",
    "Katiliyorum!",
    "Katılıyorum",
    "Katılıyorum!",
    "Girdim",
    "Girdim!",
    "Hadi bakalim",
    "Şanş benden yana",
    "Yine deniyorum",
    "Gire gire bir hal olduk",
    "Bir çekiliş daha...",
    "Şansım var mı bilemiyorum",
    "Deniyoruz yine",
    "Bir sefer daha deneyelim",
    "Bu sefer çıkacak gibi"
  ];
  const midMentions = ["@ardaibin", "@donaldkekamca", "@erensarikulak"];
  const afterfixes = [
    "sizde goz atın",
    "göz atın",
    "katılın",
    "katılın sizde",
    "katilin sizde",
    "çekilişe girin",
    "kazanabilirsiniz",
    "şansınız açık olsun",
    "şans sizle olsun",
    "deneyin şansınızı",
    "belki tutar",
    "girin derim",
    "sende katıl!",
    "hoşunuza gidebilir",
    "bu tam sizlik",
    ":))))",
    ":DDDD",
    "diğer çekilişlere de bakın",
    "siz de kazanabilirsiniz",
    "ekleyeceğiniz varsa ekleyin",
    "belki size çıkar",
    "takip etmeyi unutmayın sayfayı",
    "çıkarsa bölüşürüz",
    "beni unutmayın sonra :)",
    "kim kazanırsa bölüştürüyor",
    "hadi yine iyisiniz",
    "ortağız ona göre",
    "kazanırsanız satmayın beni",
    "hadi bakalım",
    "kazanırsanız telefonlara dönmemezlik yapmayın :)",
    "kazanırsanız bana verirsiniz :)",
    "şansımız daha fazla bu sefer",
    "tutturuyoruz bu sefer"
  ];

  let prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  let midMention = shuffle(midMentions).join(" ");
  let afterfix = afterfixes[Math.floor(Math.random() * afterfixes.length)];

  return prefix + " " + midMention + " " + afterfix;
};

module.exports = getCommentContent;
