//const consolidateCart = (cart) => { //function declaration that takes a cart array

//const consolidatedCart = cart.reduce((acc, grocery) => {
//const itemName = Object.keys(grocery)[0]

// if(acc[itemName]) {
// acc[itemName].count += 1
// } else {
// acc[itemName] = {
// ...grocery[itemName],
// count: 1
// }
// }
// return acc
// }, {})

// return consolidatedCart // creates an empty object to store the consolidated array

const consolidateCart = (cart) => {
  const consolidatedCart = {};

  const counts = cart.reduce((acc, item) => {
    // Creates a tally of each item in the cart array
    acc[Object.keys(item)[0]] = (acc[Object.keys(item)[0]] || 0) + 1; //Checks if the key-value pair exists, otherwise start at 0, then add 1
    return acc; //return the accumulator (acc)
  }, {});

  for (const item in counts) {
    // for every item in counts
    for (const grocery of cart) {
      //for every grocery in cart
      if (item === Object.keys(grocery)[0]) {
        //checks if the current item matches an item in the cart
        let obj = { ...grocery }; //
        obj[item]["count"] = counts[item]; // line 13-17 spread the item's properties and adds the count property
        consolidatedCart[item] = {
          //
          ...grocery[item], //
          count: counts[item], //
        };
        break; // breaks after processing to avoid duplicates
      }
    }
  }

  console.log("CONSOLIDATED CART:");
  console.log(consolidatedCart);

  return consolidatedCart;
};

const applyCoupons = (cart, coupons) => {
  // declaring variable and passing 2 parameters aka arguments

  const tempCart = { ...cart }; // creates a shallow copy of the cart -- shallow copies are faster and more memory efficient
  for (const grocery in tempCart) {
    //double loop: iterates through each grocery item and each coupon
    for (const coupon of coupons) {
      // double loop: iterates through each grocery item and each coupon
      let itemCopy = { ...tempCart[grocery] }; //creates a copy of the current grocery item
      if (coupon["item"] === grocery && itemCopy["count"] >= coupon["num"]) {
        // checks if coupon applies AND customer has enough quantity
        itemCopy["price"] = coupon.cost; //
        if (tempCart[grocery + " W/COUPON"] !== undefined) {
          itemCopy["count"] = tempCart[grocery + " W/COUPON"]["count"] + 1;
        } else {
          itemCopy["count"] = 1;
        }

        tempCart[grocery]["count"] -= coupon.num;
        tempCart[grocery + " W/COUPON"] = itemCopy;
      }
    }
  }

  console.log("TEMP CART");
  console.log(tempCart);
  return tempCart;
};

const applyClearance = (cart) => {
  // creates a function called applyClearance and takes 1 argument
  const tempCart = { ...cart }; // makes a shallow copy of the cart object -- this means the top level cart object is copied, but the item objects inside it are still share with the original cart
  for (const grocery in tempCart) {
    //loops through each item in tempCart
    if (tempCart[grocery].clearance) {
      //checks whether that grocery item has clearance:true
      tempCart[grocery].price = +(tempCart[grocery].price * 0.8).toFixed(2); // applies a .20 discount by saying keep 80% of the price and .toFixed(2) rounds it to two decimal places
    } // toFixed also returns a string so that the + in front converts it back into a number
  }

  return tempCart; // returns cart with the clearance discounts applied
};

const checkout = (cart, coupons) => {
  // creates a function called checkout and passes two arguments, cart and coupons.
  let newCart = consolidateCart(cart); // combines duplicate grocery items and counts how many of each item there are.
  newCart = applyCoupons(newCart, coupons); // applies coupon discounts to the cart (previous functions written)
  newCart = applyClearance(newCart); // applies clearance discount after coupons (previous functions written)
  //order matters?

  let total = 0; // starts the total at 0
  for (const item in newCart) {
    //loops through every item in the cart
    total += newCart[item].count * newCart[item].price; //adds that item's subtotal to the total
  }

  if (total > 100) {
    //states if total is more than 100, apply a 10% discount
    return total * 0.9; // means keep 90% of the total
  } else {
    // otherwise return a total without the extra discount
    return total;
  }
};

//cart
//→ consolidateCart
//→ applyCoupons
//→ applyClearance
//→ calculate total
//→ apply big order discount
