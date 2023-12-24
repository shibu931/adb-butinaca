function generateProductList(products) {
    console.log(products);
    let productListHTML = '<ul style="font-size:22px">';
  
    products.forEach(product => {
      productListHTML += `<li>${product.name} - Quantity: ${product.quantity}</li>`;
    });
  
    productListHTML += '</ul>';
  
    return productListHTML;
}

export default generateProductList;