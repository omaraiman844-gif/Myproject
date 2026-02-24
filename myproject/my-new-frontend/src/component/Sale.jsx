import React, { useState } from 'react';

export default function Sale({ sales = [], onAdd, products = [] }) {
  const [date, setDate] = useState('');
  const [sku, setSku] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const total = sales.reduce((s, r) => s + r.quantity * r.price, 0);

  function handleSubmit(e) {
    e.preventDefault();
    if (!quantity || !price) return;
    const sale = {
      date: date ? new Date(date).getTime() : Date.now(),
      sku: sku || undefined,
      product: productName || (products.find((p) => p.sku === sku) || {}).name || '',
      quantity: Number(quantity),
      price: Number(price),
    };
    if (onAdd) onAdd(sale);
    setDate('');
    setSku('');
    setProductName('');
    setQuantity('');
    setPrice('');
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Sales</h2>

      {onAdd && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
          <input placeholder="SKU (optional)" value={sku} onChange={(e) => setSku(e.target.value)} />
          <input placeholder="Product name" value={productName} onChange={(e) => setProductName(e.target.value)} />
          <input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <input placeholder="Unit price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <button type="submit">Add Sale</button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Date</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Product</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: 8 }}>Quantity</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: 8 }}>Unit Price (TSh)</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: 8 }}>Line Total (TSh)</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s, i) => (
            <tr key={i}>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f3f3' }}>{new Date(s.date).toLocaleString()}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f3f3' }}>{s.product}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f3f3', textAlign: 'right' }}>{s.quantity}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f3f3', textAlign: 'right' }}>{s.price.toFixed(2)}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f3f3', textAlign: 'right' }}>{(s.quantity * s.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} style={{ padding: 8, textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
            <td style={{ padding: 8, textAlign: 'right', fontWeight: 'bold' }}>{total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
