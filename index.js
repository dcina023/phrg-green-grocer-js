const consolidateCart = (cart) => {
  // code here
// console.log("CART:")
// console.log(cart)

const consolidatedCart = {}

const counts = cart.reduce((acc, item) => {
  acc[Object.keys(item)[0]] = (acc[Object.keys(item)[0]] || 0) + 1;
  return acc;
}, {});

for(const item in counts) {
  //console.log("counts loop")
  for(let j = 0; j < cart.length; j++) {
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
/* AVERT YOUR EYES ! BAD CODE BELOW */
  // for(let i = 0;i < cart.length; i++) {
  //   for(let z = i+1;z < cart.length; z++) {

  //     console.log(cart[i])
  //     console.log(cart[z])
  //     console.log("---------------------------------")
  //     if(cart[i] === cart[z] && ()) {
  //       if(cart[i].count !== undefined) {
  //         cart[i][0].count++
  //         cart[z].consolidated = true
  //       } else {
  //         cart[i][0].count = 2
  //         cart[z].consolidated = true
  //       }
  //       console.log("COUNT:")
  //       console.log(cart[i].count)
  //     }
  //   }
  // }
}

const applyCoupons = (cart, coupons) => {
  // code here
  console.log("COUPONS")
  console.log(coupons)
  const tempCart = {...cart}
  for(const grocery in tempCart) {
    let itemCopy = {...tempCart[grocery]}
    console.log("ITEM COPY")
    console.log(itemCopy)
    for(const coupon of coupons) {
      if(coupon["item"] === Object.keys(itemCopy)[0] && itemCopy[Object.keys(itemCopy)[0]]["count"] >= coupon["num"]) {
        itemCopy[Object.keys(itemCopy)[0]]["price"] = coupon.price
        itemCopy[Object.keys(itemCopy)[0]]["count"] = 1
        itemCopy[Object.keys(itemCopy)[0]] += "W/COUPON"
        grocery[Object.keys(grocery)[0]]["count"] -= coupon.num
      }
    }    
  }

  console.log("TEMP CART")
  console.log(tempCart)
}

const applyClearance = (cart) =>{
  // code here
}

const checkout = (cart, coupons) => {
  // code here
}
