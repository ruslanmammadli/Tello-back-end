const Basket = require("../model/basket");
const { asyncCatch } = require("../utils/asyncCatch");


exports.getBasket = asyncCatch(async (req, res) => {
    const userId = req.user._id;
    let basket = await Basket.findOne({ userId });

    res.json({
        success: true,
        data: {
            basket
        },
    });

})


exports.addProductToBasket = asyncCatch(async (req, res) => {

    const userId = req.user._id;

    const { productId, quantity, variants, price, name, photo } = req.body;

    let basket = await Basket.findOne({ userId });

    function checkVariants(productVariants) {
        let count = 0;
        for (let i = 0; i < variants.length; i++) {
            for (let j = 0; j < productVariants.length; j++) {

                if (variants[i].name === productVariants[j].name.toString() && variants[i].value === productVariants[j].value) {
                    count++;
                }
            }
        }
        if (count == variants.length) return true;
        return false;
    }

    if (basket) {
        const itemIndex = basket.products.findIndex((p, index) => {
            if (p.productId == productId && checkVariants(p.variants)) {
                return true;
            }
        });

        if (itemIndex > -1) {
            const productItem = basket.products[itemIndex];
            productItem.quantity = productItem.quantity+quantity;
            basket.products[itemIndex] = productItem;
        } else {
            basket.products.push({ productId, quantity, variants, price, name, photo });
        }
        basket = await basket.save();
        return res.status(200).json({
            success: true,
            data: {
                basket
            },
        });
    }
    else {
        const basket = await Basket.create({
            userId,
            products: [{ productId, quantity, variants, price, name, photo }]
        });
        return res.status(200).json({
            success: true,
            data: {
                basket
            },
        });

    }
})


exports.removeProductFromBasket = asyncCatch(async (req, res) => {

    const id = req.params.id;
    const userId = req.user._id;
    let basket = await Basket.findOne({ userId });

    basket.products = basket.products.filter(product => product._id != id);

    basket = await basket.save();
    res.json({
        success: true,
        data: {
            basket
        },
    });


})


exports.updateBasket = asyncCatch(async (req, res) => {
    const userId = req.user._id;
    let basket = await Basket.findOne({ userId });

    const { id, quantity } = req.body;

    const itemIndex = basket.products.findIndex((p) => p._id == id);
    const productItem = basket.products[itemIndex];
    productItem.quantity = quantity;
    basket.products[itemIndex] = productItem;

    basket = await basket.save();
    res.json({
        success: true,
        data: {
            basket
        },
    });


})


exports.clearBasket = asyncCatch(async (req, res) => {
    const userId = req.user._id;
    let basket = await Basket.findOne({ userId });

    basket.products = [];
    basket = await basket.save();


    res.json({
        success: true,
        data: {
            basket
        },
    });

})