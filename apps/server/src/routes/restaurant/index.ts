import express from 'express'
import axios from "axios";

const router = express.Router()

router.post('/search/trending/:category', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { categorySet, lon, lat, radius } = body
    try {
        if (categorySet) {
            await axios.get(`${process.env.TOMTOMURL}/poiSearch/.json?key=${process.env.TOMTOMAPIKEY}&categorySet=${categorySet}&lon=${lon}&lat=${lat}&radius=${radius}`).then((response: any) => {
                if (response.data.summary) {
                    res.json({ success: true, results: response.data.results })
                } else {
                    console.log(response.data.errorText)
                    res.json({ success: false, message: 'An error has occurred' })
                }

            })
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

module.exports = router

/*
7315081: afghan
7315002: african
7315082: algerian
7315003: american
7315083: arabian,
7315084: argentinean
7315085: armenian
7315062: asian (other)
7315086: australian
7315004: austrian
7315146: banquet rooms
7315005: barbecue
7315087: basque
7315006: belgian
7315007: bistro
7315088: bolivian
7315089: bosnian
7315072: brazilian
7315008: british
7315142: buffet,
7315090: bulgarian
7315091: burmese
7315147: cafeterias
7315009: californian
7315092: cambodian
7315010: canadian
7315011: caribbean
7315070: chicken
7315093: chilean
7315012: chinese
7315094: colombian
7315095: corsican
7315063: creole-cajun
7315013: crêperie
7315096: cuban
7315097: cypriot
7315068: czech
7315098: danish
7315099: dominican
7315057: dongbei
7315079: doughnuts
7315014: dutch
7315100: egyptian
7315101: english
7315132: erotic
7315102: ethiopian
7315133: exotic
7315015: fast food
7315016: filipino
7315104: finnish
7315134: fondue
7315017: french
7315071: fusion
7315018: german
7315019: greek
7315020: grill
7315054: guangdong
7315021: hawaiian
7315058: hot pot
7315052: Taste Hunan
7315022: hungarian
7315078: ice cream parlor
7315023: indian
7315024: indonesian
7315073: international
7315105: iranian
7315065: irish
7315106: israeli
7315025: italian
7315066: jamaican
7315026: japanese
7315027: jewish
7315028: korean
7315067: kosher
7315029: latin american
7315030: lebanese
7315107: luxembourgian
7315135: macrobiotic
7315108: maghrib
7315031: maltese
7315109: mauritian
7315032: mediterranean
7315033: mexican
7315034: middle eastern
7315110: mongolian
7315074: moroccan
7315136: mussels
7315111: nepalese
7315112: norwegian
7315075: organic
7315035: oriental
7315127: pakistani
7315061: peruvian
7315036: pizza
7315037: polish
7315129: polynesian
7315038: portuguese
7315130: provençal
7315039: pub food
7315041: roadside
7315131: rumanian
7315040: russian
7315143: salad bar
7315042: sandwich
7315113: savoyan
7315114: savoyan
7315115: scottish
7315043: seafood
7315053: shandong
7315055: shanghai
7315056: sichuan
7315116: sicilian
7315117: slavic
7315080: slovak
7315139: snacks
7315064: soul food
7315140: soup
7315044: spanish
7315045: steak hous,
7315118: sudanese
7315046: surinamese
7315148: sushi
7315119: swedish
7315047: swiss
7315120: syrian
7315059: taiwanese
7315145: take away
7315076: tapas
7315121: teppanyakki
7315048: thai
7315122: tibetan
7315123: tunisian
7315049: turkish
7315124: uruguayan
7315050: vegetarian
7315125: venezuelan
7315051: vietnamese
7315126: welsh
7315060: western continental
7315149: yogurt/juice bar

*/
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
// ,,,,
