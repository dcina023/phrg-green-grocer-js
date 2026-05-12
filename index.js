const consolidateCart = (cart) => {

const consolidatedCart = {}

const counts = cart.reduce((acc, item) => {  // Creates a tally of each item in the cart array
  acc[Object.keys(item)[0]] = (acc[Object.keys(item)[0]] || 0) + 1;  //Checks if the key-value pair exists, otherwise start at 0, then add 1
  return acc; //return the accumulator (acc)
}, {});

for(const item in counts) {
  for(let j = 0; j < cart.length; j++) { //for j in cart
    if(item === Object.keys(cart[j])[0]) {
      let obj = {...cart[j]}
      obj[item]["count"] = counts[item]
      consolidatedCart[item] = {  
          ...cart[j][item],  
          count: counts[item]        
        }
      break;
    }
  }
}

console.log("CONSOLIDATED CART:")
console.log(consolidatedCart)

return consolidatedCart
}

const applyCoupons = (cart, coupons) => {
  // code here
  const tempCart = {...cart}
  for(const grocery in tempCart) {
    for(const coupon of coupons) {
    let itemCopy = { ...tempCart[grocery] };
    if (coupon["item"] === grocery && itemCopy["count"] >= coupon["num"]) {
      itemCopy["price"] = coupon.cost;
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

  console.log("TEMP CART")
  console.log(tempCart)
  return tempCart
}

const applyClearance = (cart) =>{
  // code here
  const tempCart = {...cart}

  for(const grocery in tempCart) {
    if(tempCart[grocery].clearance) {
      tempCart[grocery].price = +(tempCart[grocery].price * 0.8).toFixed(2)
    }
  }

  return tempCart
}

const checkout = (cart, coupons) => {
  // code here
  let newCart = consolidateCart(cart)
  newCart = applyCoupons(newCart, coupons)
  newCart = applyClearance(newCart)


  let total = 0
  for(const item in newCart) {
    total += newCart[item].count * newCart[item].price
  }

  if(total > 100) {
    return total * 0.9
  } else {
    return total
  }
}