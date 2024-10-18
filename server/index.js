const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const multer = require('multer'); // For handling file uploads

const User = require('./models/user');
const Item = require('./models/item'); // Import your Item model or create it if not done yet
// Import Cart model or create it if not done yet
const Cart = require('./models/cart');
const Order = require('./models/order'); // Make sure the path is correct


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://quiz:12345@cluster0.aqvrfav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const upload = multer({ storage: multer.memoryStorage() }); // Initialize multer

// Your cart variable to keep track of items in the cart
const cart = {};

app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    newUser.save()
      .then(() => {
        res.status(201).json({ message: 'User registered successfully' });
      })
      .catch(error => {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
          res.status(400).json({ message: 'Email already registered' });
        } else {
          console.error('Error:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return the user's role along with the success message
    res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/upload-item', upload.single('itemImage'), async (req, res) => {
  try {
    const { itemName, itemPrice, description, inventory } = req.body;
    const base64Image = req.file.buffer.toString('base64');

    const newItem = new Item({
      itemName: itemName,
      itemPrice: itemPrice,
      description: description,
      inventory: inventory,
      itemImage: {
        data: base64Image,
        contentType: req.file.mimetype,
      },
    });

    await newItem.save();

    res.status(201).json({ message: 'Item uploaded successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add this route to get all items
app.get('/get-items', async (req, res) => {
  try {
    const items = await Item.find(); // Assuming you're using Mongoose
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add this route to add an item to the cart and reduce inventory


// ...

// Add this route to add an item to the cart and reduce inventory
app.post('/add-to-cart', async (req, res) => {
  try {
    const { item, quantity } = req.body;

    const selectedItem = await Item.findById(item);

    if (!selectedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (selectedItem.inventory < parseInt(quantity)) {
      return res.status(400).json({ message: 'Insufficient inventory' });
    }

    // Reduce the inventory
    selectedItem.inventory -= parseInt(quantity);
    await selectedItem.save();

    // Save cart details to MongoDB
    const cartItem = new Cart({
      item: selectedItem._id,
      quantity: parseInt(quantity),
      // Add other details as needed
    });
    await cartItem.save();

    res.status(200).json({ message: 'Item added to the cart successfully' });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update this route to get cart items with details from the database
app.get('/get-cart', async (req, res) => {
  try {
    // Fetch cart items with details from the database
    const cartItems = await Cart.find().populate('item');

    // Calculate the total
    const total = cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.quantity * cartItem.item.itemPrice;
    }, 0);

    res.status(200).json({ cartItems, total });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/pay', async (req, res) => {
  try {
    // Fetch cart items from the database
    const cartItems = await Cart.find().populate('item');

    // Calculate the total sales, total capital used, and profit
    const totalSales = cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.quantity * cartItem.item.itemPrice;
    }, 0);

    // Assuming each item was bought at 30000
    const costPricePerItem = 30000;
    const totalCapitalUsed = cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.quantity * costPricePerItem;
    }, 0);

    const profit = totalSales - totalCapitalUsed;

    // Calculate the total for the order
    const total = totalSales; // You may adjust this based on your business logic

    // Create a new order instance
    const order = new Order({
      cartItems: cartItems.map((cartItem) => ({
        item: cartItem.item._id,
        quantity: cartItem.quantity,
      })),
      totalSales,
      totalCapitalUsed,
      profit,
      total, // Include the total field
    });

    // Save the order to the database
    await order.save();

    // Clear the cart after successful "payment"
    await Cart.deleteMany();

    // Respond with order details
    res.status(200).json({ message: 'Order confirmed!', orderDetails: order });
  } catch (error) {
    console.error('Error confirming order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Update this route to fetch orders from the database
app.get('/get-orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('cartItems.item');
    
    // Extract the fields you want to include in the response
    const formattedOrders = orders.map(order => ({
      _id: order._id,
      cartItems: order.cartItems,
      totalSales: order.totalSales,
      totalCapitalUsed: order.totalCapitalUsed,
      profit: order.profit,
      __v: order.__v,
    }));

    res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
