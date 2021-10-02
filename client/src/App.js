import { Switch, Route } from "react-router-dom"
import { Products } from "./pages/product"
import { Cart } from "./pages/cart"
import { CreateProduct } from "./pages/product/create"
import { Navbar } from "./components/Navbar"
import { Error } from "./pages/error";

function App() {
  return (
      <div className='App'>
        <Navbar />
          <div className="my-5">
            <Switch>
                <Route exact path='/' component={Products} />
                <Route path="/cart" component={Cart} />
                <Route path="/admin" component={CreateProduct} />
                <Route component={Error} />
            </Switch>
          </div>
      </div>
  );
}

export default App;
