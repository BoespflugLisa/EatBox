const express = require("express");
const MenuModel = require("../models/Menu")
const ArticleModel = require("../models/Article")
const router = express.Router();


router.post("/:id", async (req, res) => {
    try {
        let menu = new MenuModel({
            made_by: req.params.id,
            Name: req.body.data.Name,
            MenuImg: req.body.data.MenuImg,
            Description: req.body.data.Description,
            Price: req.body.data.Price,
            Articles: req.body.data.Articles,
        })
        if (!menu.populated('made_by')) {
            await menu.populate('made_by Articles')
                .then(p => console.log(p))
                .catch(error => console.log(error));
        }
        menu = await menu.save();
        console.log(menu)
        res.status(200).json({
            message: "Le menu a été créé.",
            menu,
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
        let menus = await MenuModel.find().populate('Articles', 'Name').exec();
        res.status(200).json({
            menus,
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
        let menu = await MenuModel.findById(req.params.id)
            .populate('Articles', 'Name').exec();
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

router.put("/:id", async(req, res) => {
    try {
        MenuModel.updateOne({_id: req.params.id}, req.body.data).then(
            () => {
                res.status(204).json({
                    message: 'Menu updated successfully!'
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
        MenuModel.remove({_id: req.params.id}).then(
            () => {
                res.status(204).json({
                    message: 'Menu deleted successfully!'
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
