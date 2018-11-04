import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class ProductApp extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
         
          <p>
            E-commerce Template
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div className="container">
          <br />
          <h4>Buy Stuff Here</h4>
          
          <ProductList />
        </div>
      </div>
    );
  }
}

export default ProductApp;

class ProductForm extends Component{
  
  handleSubmit = (e) =>{
    e.preventDefault();
    alert(this.refs.name.value + ' $'+this.refs.price.value)
    const product = {
      name: this.refs.name.value,
      price: this.refs.name.value
    }

    this.props.createProduct(product)
  
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <legend>Add another product</legend>
        <div className="form-group">
          <label htmlfor="product">Product</label>
          <input name="product" className="form-control" ref="name" />
        </div>
        <div className="form-group">
        <label htmlfor="price">Price</label>
        <input name="price" className="form-control" ref="price" />
      </div>
        <button type="submit" className="btn btn-primary">Create Product</button>
      </form>
    )
  }

}

class ProductList extends Component{

  state = { 
    total: 0,
    products: [
      {name: "Apples", price: 0.39},
      {name: "Oranges", price: 0.49},
      {name: "Banannas", price: 0.45}
    ]
  }

  calcTotal =(price) => {
    
    this.setState({total: this.state.total + price })
    // setTimeout(()=>(alert(this.state.total)), 1000)
  }

  createProduct =(product)=>{
    this.setState({
      products: this.state.products.concat(product)
    })
  }

  render(){
    //var that = this;
    var products = this.state.products.map((product)=>{
      return (
        <Product name={product.name} 
                price= {product.price}
                calcTotal={this.calcTotal} 
        />
      )
    })

    return(
      <div>
      
        {products}
        
        <Total total={this.state.total} />
        <br />

        <ProductForm createProduct ={this.createProduct} />
      </div>
    )
  }
}

class Product extends React.Component{

 state = { qty: 0};

  
  buy = () => {
    this.setState({qty: this.state.qty + 1})
    this.props.calcTotal(this.props.price)
  }

  render(){
    return(
      <div className="card" style={{marginBottom:"15px"}}>
      <p>{this.props.name} - ${this.props.price}</p>
      <h5>Quantity: {this.state.qty} item(s)</h5>
      <br /><br />
      <button onClick={()=>(this.buy() )}>Buy</button>
      </div>
    )

  }

}

class Total extends Component{
  render(){
    return(
      <div classNane="card">
        <h3>Total: ${Math.round(this.props.total*100)/100}</h3>
      </div>
    )
  }
}