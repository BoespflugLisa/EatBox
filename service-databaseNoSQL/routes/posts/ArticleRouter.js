const express = require("express");
const ArticleModel = require("../../models/Article")
const {model: CategoryModel} = require("../../models/Category");
const RestaurantModel = require("../../models/Restaurant").model;
const router = express.Router();


router.post("/:id", async (req, res) => {
    try {
        let restaurant = await RestaurantModel.findById(req.params.id).exec();
        let article = new ArticleModel({
            made_by : restaurant._id,
            Name : "Frites",
            Image_path : "../image.png",
            Description : "Les meilleurs que vous avez goûtés depuis très longtemps",
            Price : 1.10,
            Available: true,
            Promotions : {
                UnPour2 : false,
                Remise : {
                    5 : true,
                    10 : false,
                    15 : false,
                    20 : false,
                },
            },
            Options : {
                Taille : {Petit: true, Moyen: false, Large: true},
                Sauce : {Ketchup: true, Mayonnaise: true, Moutarde: false, Barbecue: false, Maison: true, Andalouse:false},
                Prix : {Taille :[0,0,0.30], Sauce : [0]},
            }
        })
        if(!article.populated('made_by')){
            await article.populate('made_by')
                .then(p=>console.log(p))
                .catch(error=>console.log(error));;
        }
        article = await article.save();
        console.log(article)
        res.status(200).json({
            message: "L'article a été créé.",
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
});

router.get("/", async (req, res) => {
    try {
        let articles = await ArticleModel.find();
        res.status(200).json({
            articles,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
    return 0
})

router.get("/:id", async (req, res) => {
    try {
        let article = await ArticleModel.findOne({
            type: req.params.id,
        });
        if (article) {
            res.status(200).json({
                article,
            });
        }
        res.status(400).json({
            status: 400,
            message: "L'article n'a pas été trouvé.",
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})

router.put("/:id", async(req, res) => {
    try {
        ArticleModel.updateOne({_id: req.params.id}, req.body.data).then(
            () => {
                res.status(204).json({
                    message: 'Category updated successfully!'
                });
            })
    }
    catch(err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
})

module.exports = router;
