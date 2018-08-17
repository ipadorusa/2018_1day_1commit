const deliveryProduct = {
    orderedDate: '2018-01-15',
    estimatedDate: '2018-01-20',
    status: '배송중',
    items: [
      {name: '사과', price: 1000, quantity: 3},
      {name: '배', price: 1500, quantity: 2},
      {name: '딸기', price: 2000, quantity: 4}
    ]
  }
  
  const {
    estimatedDate: esti,
    status,
    items: [ , ...products]
  } = deliveryProduct
  console.log(esti, status, products)

