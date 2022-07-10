const express = require("express");
const ArticleModel = require("../models/Article")
const {model: CategoryModel} = require("../models/Category");
const router = express.Router();


router.post("/:id", async (req, res) => {
    try {
        let article = new ArticleModel({
            made_by : req.params.id,
            Name : req.body.data.Name,
            ArticleImg : req.body.data.ArticleImg,
            Description : req.body.data.Description,
            Price : req.body.data.Price,
            Category: req.body.data.Category
        })

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
        let article = await ArticleModel.findById(req.params.id)
            .populate('Category', 'Name').exec();

        if (article) {
            res.status(200).json({
                article,
            });
        }
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
                    message: 'Article updated successfully!'
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

router.delete('/:id', function(req, res, next) {
    try {
        ArticleModel.deleteOne({_id: req.params.id}).then(
            () => {
                res.status(204).json({
                    message: 'Article deleted successfully!'
                });
            }
        )}
    catch(err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

module.exports = router;
