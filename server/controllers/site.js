const Site = require('../models/site');

exports.getSiteData = (req, res, next) => {
  Site.findOne({}, (err, site) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(site.siteInfo)
  });
};

exports.updateSiteData = async (req, res, next) => {
  try {
    const site = await Site.findOneAndUpdate(
      {},
      { "$set": { siteInfo: req.body } },
      { new: true }
    );
    console.log(site.siteInfo);
    return res.status(200).send({
      success: true,
      siteInfo: site.siteInfo
    })
  } catch(err) {
    return res.json({ success: false, err });
  }
};