import express from 'express'
import axios from "axios";

const router = express.Router()

router.post('/search/trending/:category', async (req: express.Request, res: express.Response) => {
    const { body } = req;
    const { categorySet, lon, lat, radius } = body
    try {
        if (categorySet) {
            await axios.get(`${process.env.TOMTOMURL}/poiSearch/.json?key=${process.env.TOMTOMAPIKEY}&categorySet=${categorySet}&lon=${lon}&lat=${lat}&radius=${radius}`).then((response:any) => {
                if (response.data.summary) {
                    console.log(response.data.summary)
                    res.json({success: true, results: response.data.results})
                }else {
                    console.log(response.data.errorText)
                    res.json({success: false, message: 'An error has occurred'})
                }
            })
        }
    } catch (e) {
        console.log(e)
        res.json({ success: false, message: "An error has occurred" }).status(400)
    }
})

module.exports = router