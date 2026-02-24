import React, { useState } from 'react';

export default function Product({ products = [], onAdd }) {
	const [sku, setSku] = useState('');
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		if (!sku || !name || !price) return;
		const p = { sku, name, price: Number(price) };
		if (onAdd) onAdd(p);
		setSku('');
		setName('');
		setPrice('');
	}

	return (
		<div style={{ marginBottom: 20 }}>
			<h2>Products</h2>

			{onAdd && (
				<form onSubmit={handleSubmit} style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
					<input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
					<input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
					<input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
					<button type="submit">Add Product</button>
				</form>
			)}

			<table style={{ width: '100%', borderCollapse: 'collapse' }}>
				<thead>
					<tr>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>SKU</th>
						<th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Name</th>
						<th style={{ textAlign: 'right', borderBottom: '1px solid #ddd', padding: 8 }}>Price (TSh)</th>
					</tr>
				</thead>
				<tbody>
					{products.map((p) => (
						<tr key={p.sku}>
							<td style={{ padding: 8, borderBottom: '1px solid #f3f3f3' }}>{p.sku}</td>
							<td style={{ padding: 8, borderBottom: '1px solid #f3f3f3' }}>{p.name}</td>
							<td style={{ padding: 8, borderBottom: '1px solid #f3f3f3', textAlign: 'right' }}>{p.price.toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

