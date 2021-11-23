const enhanceLunr = (lunr, lngs, multi) => {
  if (lngs.length) {
    require('lunr-languages/lunr.stemmer.support')(lunr)
    if (multi){
      require('lunr-languages/lunr.multi')(lunr)
    }
    lngs.forEach(({name}) => {
      if (name !== 'en') {
        try {
          if (name === 'jp' || name === 'ja') {
            require(`lunr-languages/tinyseg`)(lunr)
          }
          require(`lunr-languages/lunr.${name}`)(lunr)
        } catch (e) {
          console.log(e)
        }
      }
    })
  }
}

module.exports = {
  enhanceLunr,
}
