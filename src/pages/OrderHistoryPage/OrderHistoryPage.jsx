import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/orders-api';
import './OrderHistoryPage.css';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import MenuList from '../../components/MenuList/MenuList';
import OrderListDetail from '../../components/OrderListDetail/OrderListDetail';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import OrderList from '../../components/OrderList/OrderList';

export default function OrderHistoryPage({ user, setUser }) {
  const [orderItems, setOrderItems] = useState([]);
  const [activeOrder, setActiveOrder] = useState('');
  const [cart, setCart] = useState(null);
  const categoriesRef = useRef([]);

  const history = useHistory();

  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      categoriesRef.current = items.reduce((cats, item) => {
        const cat = item.category.name;
        return cats.includes(cat) ? cats : [...cats, cat];
      }, []);
      setOrderItems(items);
      setActiveOrder(items[0].category.name);
    }
    getItems();

    // Load cart (a cart is the unpaid order for the logged in user)
    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);

  async function handleOrderDetails(itemId) {
    const cart = await ordersAPI.addItemToCart(itemId);
    setCart(cart);
  }

  return (
    <main className="OrderHistoryPage">
      <aside>
        <Logo />
        <Link to="/orders/new" className="button btn-sm">NEW ORDER</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <OrderList
        orderItems={orderItems.filter(item => item.category.name === activeOrder)}
        handleOrderDetails={handleOrderDetails}
      />
      <OrderListDetail
        order={cart}
      />
    </main>
  );
}