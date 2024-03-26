var express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user");
const Product = require("./models/product");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    return res.send("hello");
});

// api sign-up
app.post("/sign-up", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(200).json({
                EM: "Email id is already register",
                EC: 1,
                DT: "",
            });
        } else {
            const result = await User.create(req.body);
            return res.status(200).json({
                EM: "Create user successfully!",
                EC: 0,
                DT: result,
            });
        }
    } catch (error) {
        return res.status(500).json({
            EM: error.message,
            EC: -1,
            DT: "",
        });
    }
});

// api login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
            .where("password")
            .gte(password);
        if (user) {
            return res.status(200).json({
                EM: "Login is successfully!",
                EC: 0,
                DT: user,
            });
        } else {
            return res.status(400).json({
                EM: "Email or password is correct!",
                EC: 1,
                DT: user,
            });
        }
    } catch (error) {
        return res.status(400).json({
            EM: "Server error!",
            EC: -1,
            DT: "",
        });
    }
});

app.post("/product", async (req, res) => {
    try {
        const { name, category, image, price, description } = req.body;
        const product = await Product.create(req.body);
        return res.status(200).json({
            EM: "create product successfully!",
            EC: 0,
            DT: product,
        });
    } catch (error) {
        return res.status(400).json({
            EM: "Server error!",
            EC: -1,
            DT: "",
        });
    }
});

app.get("/product", async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({
            EM: "Get products successfully!",
            EC: 0,
            DT: products,
        });
    } catch (error) {
        return res.status(400).json({
            EM: error.message,
            EC: -1,
            DT: "",
        });
    }
});

app.get("/product/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({ _id: id });
        if (product) {
            return res.status(200).json({
                EM: `Get product have id: ${id}`,
                EC: 0,
                DT: product,
            });
        }
        return res.status(200).json({
            EM: `No find product have id ${id}`,
            EC: 1,
            DT: product,
        });
    } catch (error) {
        return res.status(400).json({
            EM: "Server error!",
            EC: -1,
            DT: "",
        });
    }
});

// mongodb connection
(async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    try {
        console.log("Connection mongodb successfully!");
    } catch (error) {
        console.log(error.message);
    }
})();

app.listen(PORT, () => {
    console.log("Server is running at port", PORT);
});
