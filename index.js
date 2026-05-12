const consolidateCart = (cart) => {
  // code here
console.log("CART:")
console.log(cart)

const consildatedCart = []

const counts = cart.reduce((acc, item) => {
  acc[Object.keys(item)[0]] = (acc[Object.keys(item)[0]] || 0) + 1;
  return acc;
}, {});
console.log("COUNT:")
console.log(counts)
console.log("-----------")

for(const item in counts) {
  //console.log("counts loop")
  for(let j = 0; j < cart.length; j++) {
    // console.log("!FOUND! Comparison Loop")
    // console.log(item)
    // console.log(Object.keys(cart[j])[0])
    if(item === Object.keys(cart[j])[0]) {
      //console.log("!FOUND! THIS WORKED")
      let obj = {...cart[j]}
      //console.log("obj[item]")
      //console.log(obj[item])
      obj[item]["count"] = counts[item]
      consildatedCart.push(obj)
      break;
    }
  }
}

console.log("CONSOLIDATED CART:")
console.log(consildatedCart)

cart = consildatedCart
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
}

const applyClearance = (cart) =>{
  // code here
}

const checkout = (cart, coupons) => {
  // code here
}
