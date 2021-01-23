import './OrderList.css';
import OrderListItem from '../OrderListItem/OrderListItem';

export default function OrderList({ orderItems, handleOrderDetails }) {
  const items = orderItems.map(item =>
    <OrderListItem
      key={item._id}
      orderItem={item}
      handleOrderDetails={handleOrderDetails}
    />
  );
  return (
    <main className="OrderList">
      {items}
    </main>
  );
}