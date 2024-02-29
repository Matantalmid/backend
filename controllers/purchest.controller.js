const { Purchase } = require("../models/purchase.model");
const { Event } = require("../models/event.model");
const { User } = require("../models/users.model");
const jwt = require("jsonwebtoken");

const getPurchase = async (req, res) => {
  const { purchaseId } = req.body;
  try {
    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
      return res.status(404).send("Purchase not found");
    }
    res.send(purchase);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({});

    res.send(purchases);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const addPurchase = async (req, res) => {
  const { ...purchaseData } = req.body;
  const { id } = req.params;
  console.log(id);
  try {
    if (!req.headers.authorization) {
      console.log("bad");
      return res.status(401).send("Unauthorized: Missing Authorization header");
    } 
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      "123456"
    );

    const event = await Event.findById(id);
    if (event) {
      console.log("ok");
      const purchase = new Purchase({
        userId: decoded.id,
        eventId: id,
        ...purchaseData,
      });
      console.log(purchase);

      if (purchase.numOfTicekts <= event.seatsLeft) {
        const evnetId = event._id;

        const user = await User.findById(decoded.id);
        console.log(user);
        if (!user.userEvents.includes(evnetId)) {
          user.userEvents.push(evnetId);
          await user.save();
        }
        console.log(user.userPurchases);
        user.userPurchases.push(purchase);
        await user.save();

        event.purchasers.push(purchase);
        await event.save();

        await purchase.save();
        event.seatsLeft = event.seatsLeft - purchase.numOfTicekts;
        await event.save();

        return res.send(purchase);
      } else {
        return res.status(404).send(`tickets left ${event.seatsLeft}`);
      }
    } else {
      return res.status(404).send("Event not found");
    }
  } catch (error) {
    console.error("Error adding purchase:", error);
    return res.status(400).send(error);
  }
};

// const deleteEvent = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const isDeleted = await Purchest.findByIdAndDelete(id);
//     if (isDeleted) {
//       res.send("deleted successfully");
//     } else {
//       res.send("vrey bad");
//     }
//   } catch (error) {
//     res.status(400).send("Error");
//   }
// };

module.exports = {
  getPurchase,
  getPurchases,
  addPurchase,
};
