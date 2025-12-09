export const getCartProducts = async (req, res) => {
    const user = req.user;
    try {
        await user.populate("cartItems.product"); // populate product details
        res.json(user.cartItems);
    } catch (error) {
        console.log("Error in getCartProducts:", error.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

export const addToCart = async (req, res) => {
    const { productId } = req.body;
    const user = req.user;

    try {
        const existingItem = user.cartItems.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push({ product: productId, quantity: 1 });
        }

        await user.save();
        await user.populate("cartItems.product");
        res.json(user.cartItems);

    } catch (error) {
        console.log("Error in addToCart:", error.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

export const removeAllFromCart = async (req, res) => {
    const { productId } = req.body;
    const user = req.user;

    try {
        if (!productId) {
            user.cartItems = [];
        } else {
            user.cartItems = user.cartItems.filter(
                (item) => item.product.toString() !== productId
            );
        }

        await user.save();
        await user.populate("cartItems.product");
        res.json(user.cartItems);

    } catch (error) {
        console.log("Error in removeAllFromCart:", error.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
};

export const updateQuantity = async (req, res) => {
    const { productId, quantity } = req.body; // quantity should come from frontend
    const user = req.user;

    try {
        const item = user.cartItems.find(
            (i) => i.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: "Product not found in cart." });
        }

        if (quantity <= 0) {
            // remove item if quantity 0 or negative
            user.cartItems = user.cartItems.filter(
                (i) => i.product.toString() !== productId
            );
        } else {
            item.quantity = quantity;
        }

        await user.save();
        await user.populate("cartItems.product");
        res.json(user.cartItems);

    } catch (error) {
        console.log("Error in updateQuantity:", error.message);
        res.status(500).json({ message: "Internal Server Error." });
    }
};
