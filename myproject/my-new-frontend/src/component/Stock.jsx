import React, { useState } from 'react';

export default function Stock({ items = [], onAdd }) {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [stockCount, setStockCount] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!sku || !name || stockCount === '') return;
    const it = { sku, name, stock: Number(stockCount) };
    if (onAdd) onAdd(it);
    setSku('');
    setName('');
    setStockCount('');
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>Stock</h2>

      {onAdd && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
          <input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Stock" type="number" value={stockCount} onChange={(e) => setStockCount(e.target.value)} />
          <button type="submit">Add Stock</button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>SKU</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Name</th>
            <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: 8 }}>Available</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.sku}>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f3f3' }}>{it.sku}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f3f3' }}>{it.name}</td>
              <td style={{ padding: 8, borderBottom: '1px solid #f3f3f3', textAlign: 'right' }}>{it.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
