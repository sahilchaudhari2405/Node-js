const ShortUniqueId = require('short-unique-id');
const URL = require('../models/url');
async function handleGenerateShortUrl(req,res){
  const uid = new ShortUniqueId({ length: 10 });
  const ShortId = uid.rnd();
 const body=req.body;
 if(!body.url)return res.status(400).json({error:"url is required"});
  await URL.create({
    shortId:ShortId,
    redirectUrl:body.url,
    visitHistory:[],
  })
  return res.json({id:ShortId});
}
async function handleGetAnalytics(req, res) {
  const shortId =req.params.Id;
  console.log(shortId);
  try {
    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({ totalClick: result.visitHistory.length, analytics: result.visitHistory });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// async function handleGetAnalytics(req, res) {
//   const shortId = req.params.ShortId;
  
//   try {
//     const result = await URL.findOne({ shortId });

//     if (!result) {
//       return res.status(404).json({ error: "Short URL not found" });
//     }

//     return res.json({ totalClick: result.visitHistory.length, analytics: result.visitHistory });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

module.exports={
handleGenerateShortUrl,
handleGetAnalytics,
}