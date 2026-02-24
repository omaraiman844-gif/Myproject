import React, { useState } from 'react';
import './App.css';
import Product from './component/Product';
import Sale from './component/Sale';
import Stock from './component/Stock';
import Dashboard from './component/Dashboard';
import Sidebar from './component/Sidebar';
import Login from './component/Login';

const initialProducts = [
	{ sku: 'P001', name: 'Sugar 1kg', price: 2500 },
	{ sku: 'P002', name: 'Cooking Oil 2L', price: 8000 },
	{ sku: 'P003', name: 'Rice 5kg', price: 12000 },
];

const initialStock = [
	{ sku: 'P001', name: 'Sugar 1kg', stock: 50 },
	{ sku: 'P002', name: 'Cooking Oil 2L', stock: 20 },
	{ sku: 'P003', name: 'Rice 5kg', stock: 15 },
];

const initialSales = [
	{ date: Date.now() - 1000 * 60 * 60 * 24, product: 'Sugar 1kg', quantity: 3, price: 2500, sku: 'P001' },
	{ date: Date.now() - 1000 * 60 * 60 * 5, product: 'Cooking Oil 2L', quantity: 1, price: 8000, sku: 'P002' },
	{ date: Date.now() - 1000 * 60 * 30, product: 'Rice 5kg', quantity: 2, price: 12000, sku: 'P003' },
];

export default function App() {
	const [user, setUser] = useState(null);
	const [products, setProducts] = useState(initialProducts);
	const [stock, setStock] = useState(initialStock);
	const [sales, setSales] = useState(initialSales);
	const [activePage, setActivePage] = useState('dashboard');

	function handleLogin(userData) {
		setUser(userData);
	}

	function handleLogout() {
		setUser(null);
		setActivePage('dashboard');
	}

	if (!user) {
		return <Login onLogin={handleLogin} />;
	}

	function addProduct(p) {
		setProducts((s) => [p, ...s]);
	}

	function addStockItem(item) {
		setStock((s) => [item, ...s]);
	}

	function addSale(sale) {
		setSales((s) => [sale, ...s]);

		// update stock when sale contains sku
		setStock((prev) => {
			const idx = prev.findIndex((it) => it.sku === sale.sku);
			if (idx === -1) return prev;
			const copy = [...prev];
			copy[idx] = { ...copy[idx], stock: Math.max(0, copy[idx].stock - sale.quantity) };
			return copy;
		});
	}

	return (
		<div style={{ display: 'flex', height: '100vh', fontFamily: 'Segoe UI, Roboto, sans-serif' }}>
			<Sidebar active={activePage} onSelect={setActivePage} user={user} onLogout={handleLogout} />
			<div style={{ marginLeft: 260, flex: 1, padding: 24, overflowY: 'auto', background: '#f5f5f5' }}>
				<h1>Dashboard - Sales & Stock</h1>

				{activePage === 'dashboard' && (
					<Dashboard products={products} stock={stock} sales={sales} />
				)}

				{activePage === 'products' && (
					<Product products={products} onAdd={addProduct} />
				)}

				{activePage === 'stock' && (
					<Stock items={stock} onAdd={addStockItem} />
				)}

				{activePage === 'sales' && (
					<Sale sales={sales} onAdd={addSale} products={products} />
				)}
			</div>
		</div>
	);
}

