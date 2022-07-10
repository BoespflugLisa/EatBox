const express = require("express");
const router = express.Router();
const MenuModel = require("../models/Menu")
const ArticleModel = require("../models/Article")
const CategoryModel = require("../models/Category").model;


//GET tous les menus d'un restaurant
router.get("/menus/:id", async (req, res) => {
    try {
        let menu = await MenuModel.find({made_by:req.params.id})
            .populate('Articles', 'Name')
        if (menu) {
            res.status(200).json({
                menu,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})


//GET tous les articles d'un restaurant
router.get("/articles/:id", async (req, res) => {
    try {
        let article = await ArticleModel.find({made_by:req.params.id})
            .populate('Category')
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


//GET tous les categories d'un restaurant
router.get("/categories/:id", async (req, res) => {
    try {
        let categorie = await CategoryModel.find({belongs_to:req.params.id})
        if (categorie) {
            res.status(200).json({
                categorie,
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message,
        })
    }
})



module.exports = router;