const { Router } = require("express");
const router = Router();
const Jimp = require("jimp");

router.get("/", (req, res) => {
    try {
        res.render("index");
    } catch (e) {
        console.log(e)
    }
});

router.post("/", async (req, res) => {
  try {
    let imgRaw = "./public/raw/ramadan.jpg"; // 626 626
    let imgActive = "./public/active/ramadan.jpg";
    let imgExported = "./public/export/image.jpg";

    let textData = {
      text: `${req.body.name}`.charAt(0).toUpperCase() + `${req.body.name}`.slice(1),
      maxWidth: 606,
      maxHeight: 400,
      ofX: 10,
      ofY: 300,
    };
    
    if(textData.text.length){
       textData.text += `\nramazon muborak`
    }


    const cloneRamadan = await Jimp.read(imgRaw);
    await cloneRamadan.clone().write(imgActive);

    let active = await Jimp.read(imgActive);
    let font = await Jimp.loadFont(
      "./public/font/JclBa_5M6PVYiaM2Fjrc7aYI.ttf.fnt"
    );
    let image = await active.print(font, textData.ofX, textData.ofY,{
        text: textData.text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
      },
      textData.maxWidth
    );

    await image.quality(100).write(imgExported);

    res.redirect("/success");
  } catch (e) {
    console.log(`rasmga textni joylashda xatolik yuz berdi: ${e}`);
  }
});



router.get("/success", (req, res) => {
    try {
        res.render("success");
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;
