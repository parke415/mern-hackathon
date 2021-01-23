import './OrderListItem.css';

export default function OrderListItem({ orderItem, handleOrderDetails }) {
  return (
    <div className="OrderListItem" onClick={() => handleOrderDetails(orderItem._id)}>
      <div className="emoji flex-ctr-ctr">{orderItem.emoji}</div>
      <div className="name">{orderItem.name}</div>
      <div className="buy">
        <span>${orderItem.price.toFixed(2)}</span>
      </div>
    </div>
  );
}