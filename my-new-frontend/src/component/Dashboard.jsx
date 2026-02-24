import React from 'react';

function formatCurrency(n) {
	return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const KPICard = ({ label, value, gradient }) => (
	<div style={{
		padding: 20,
		background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
		border: 'none',
		borderRadius: 10,
		boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
		transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
		cursor: 'pointer',
		transform: 'translateY(0)',
	}}
	onMouseEnter={(e) => {
		e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
		e.currentTarget.style.transform = 'translateY(-4px)';
	}}
	onMouseLeave={(e) => {
		e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
		e.currentTarget.style.transform = 'translateY(0)';
	}}>
		<div style={{fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px'}}>
			{label}
		</div>
		<div style={{fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1}}>
			{value}
		</div>
	</div>
);

export default function Dashboard({ products = [], stock = [], sales = [] }) {
	const totalRevenue = sales.reduce((s, r) => s + r.quantity * r.price, 0);
	const totalUnitsSold = sales.reduce((s, r) => s + r.quantity, 0);

	// map SKU -> price from products (fallback to sale.price)
	const priceBySku = {};
	products.forEach((p) => (priceBySku[p.sku] = p.price));

	const totalStockValue = stock.reduce((s, it) => {
		const unit = priceBySku[it.sku] ?? 0;
		return s + it.stock * unit;
	}, 0);

	const totalItemsInStock = stock.reduce((s, it) => s + it.stock, 0);

	const lowStock = stock.filter((it) => it.stock <= 10).slice(0, 8);

	// compute top selling products by quantity
	const byProduct = {};
	sales.forEach((s) => {
		const key = s.sku || s.product;
		if (!byProduct[key]) byProduct[key] = { name: s.product, qty: 0, sku: s.sku };
		byProduct[key].qty += s.quantity;
	});
	const topSelling = Object.values(byProduct).sort((a, b) => b.qty - a.qty).slice(0, 5);

	return (
		<div style={{
			background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
			borderRadius: 12,
			padding: 24,
			marginBottom: 24,
			boxShadow: '0 8px 32px rgba(102, 126, 234, 0.2)'
		}}>
			<div style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
				gap: 16,
				marginBottom: 24
			}}>
				<KPICard label="Total Revenue" value={`TSh ${formatCurrency(totalRevenue)}`} gradient={['#667eea', '#764ba2']} />
				<KPICard label="Units Sold" value={totalUnitsSold} gradient={['#f093fb', '#f5576c']} />
				<KPICard label="Items in Stock" value={totalItemsInStock} gradient={['#4facfe', '#00f2fe']} />
				<KPICard label="Stock Value" value={`TSh ${formatCurrency(totalStockValue)}`} gradient={['#43e97b', '#38f9d7']} />
			</div>

			<div style={{
				display: 'grid',
				gridTemplateColumns: '1fr 320px',
				gap: 16,
			}}>
				<div style={{
					padding: 20,
					background: '#fff',
					borderRadius: 10,
					boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
				}}>
					<div style={{
						fontSize: 16,
						fontWeight: 700,
						marginBottom: 16,
						color: '#2c3e50',
						borderBottom: '3px solid #667eea',
						paddingBottom: 8,
						display: 'inline-block'
					}}>🔥 Top Selling Products</div>
					{topSelling.length === 0 ? (
						<div style={{ color: '#999', fontSize: 14, marginTop: 12 }}>No sales yet</div>
					) : (
						<ol style={{
							margin: 0,
							paddingLeft: 20,
							listStyle: 'none',
							counterReset: 'step-counter'
						}}>
							{topSelling.map((t, i) => (
								<li key={i} style={{
									padding: '10px 0',
									color: '#555',
									fontSize: 14,
									fontWeight: 500,
									borderBottom: i < topSelling.length - 1 ? '1px solid #f0f2f5' : 'none',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<div>
										<div>{i + 1}. {t.name}</div>
										<div style={{fontSize: 12, color: '#999', marginTop: 2}}>SKU: {t.sku || 'N/A'}</div>
									</div>
									<span style={{background: '#667eea', color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600}}>{t.qty} units</span>
								</li>
							))}
						</ol>
					)}
				</div>

				<div style={{
					padding: 20,
					background: '#fff',
					borderRadius: 10,
					boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
				}}>
					<div style={{
						fontSize: 16,
						fontWeight: 700,
						marginBottom: 16,
						color: '#2c3e50',
						borderBottom: '3px solid #f5576c',
						paddingBottom: 8,
						display: 'inline-block'
					}}>⚠️ Low Stock</div>
					{lowStock.length === 0 ? (
						<div style={{ color: '#43e97b', fontSize: 14, marginTop: 12, fontWeight: 600 }}>✓ All items healthy</div>
					) : (
						<ul style={{
							margin: 0,
							paddingLeft: 0,
							listStyle: 'none'
						}}>
							{lowStock.map((it) => (
								<li key={it.sku} style={{
									padding: '10px 0',
									color: '#555',
									fontSize: 13,
									borderBottom: '1px solid #f0f2f5',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center'
								}}>
									<div>
										<div>{it.name}</div>
										<div style={{fontSize: 11, color: '#999', marginTop: 2}}>SKU: {it.sku}</div>
									</div>
									<span style={{background: '#f5576c', color: '#fff', padding: '4px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700}}>{it.stock}</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

