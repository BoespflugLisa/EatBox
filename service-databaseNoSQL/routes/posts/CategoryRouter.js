const express = require("express");
const ArticleModel = require("../../models/Article");
const CategoryModel = require("../../models/Category").model;
const router = express.Router();



router.post("/:id", async(req, res) => {
    try {
        let category = new CategoryModel({
            Name: req.body.data.Name,
            belongs_to: req.params.id,
        });

        category = await category.save();
        res.status(200).json({
            category,
        });
    }
    catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
});

router.get("/", async (req, res) => {
    try {
        let categories = await CategoryModel.find();
        res.status(200).json({
            categories,
        });
    } catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        let categories = await CategoryModel.findById(req.params.id).exec();
        if (categories) {
            res.status(200).json({
                categories,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message : err.message,
        })
    }
})





router.put("/:id", async(req, res) => {
    try {
        CategoryModel.updateOne({_id: req.params.id}, req.body.data).then(
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


router.delete('/:id', function(req, res, next) {
    try {
        CategoryModel.remove({_id: req.params.id}).then(
            () => {
                res.status(204).json({
                    message: 'Category deleted successfully!'
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
