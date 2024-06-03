
function Product(props) {
  const { product } = props;
  return (
    <>
        <div className='col-12 mb-4' key={product.id}>
          
          <div className="card" >
            <img style={{height: "300px" , objectFit : "contain"} } src={product.image} className="card-img-top" alt={product.title} />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description} </p>
              <p className="card-text">Price : $ {product.price} </p>
            </div>
          </div>
        </div>
    </>
  );

}
export default Product;