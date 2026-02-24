import React from 'react';

const menuIcons = {
  dashboard: '📊',
  products: '📦',
  stock: '📈',
  sales: '💰',
};

export default function Sidebar({ active, onSelect, user, onLogout }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'Products' },
    { id: 'stock', label: 'Stock' },
    { id: 'sales', label: 'Sales' },
  ];

  return (
    <div style={{
      width: 260,
      background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
      color: '#ecf0f1',
      padding: 0,
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 20px rgba(0,0,0,0.1)',
      zIndex: 1000,
    }}>
      <div style={{
        padding: 20,
        fontSize: 24,
        fontWeight: 800,
        borderBottom: '2px solid rgba(255,255,255,0.2)',
        background: 'rgba(0,0,0,0.1)',
        letterSpacing: '1px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{fontSize: 28}}>🎯</span>
        Business
      </div>
      
      <nav style={{
        paddingTop: 16,
        flex: 1,
        overflowY: 'auto',
      }}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            style={{
              width: '100%',
              padding: '14px 16px',
              textAlign: 'left',
              border: 'none',
              background: active === item.id 
                ? 'rgba(255,255,255,0.25)' 
                : 'transparent',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 15,
              fontWeight: active === item.id ? 700 : 500,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              borderLeft: active === item.id ? '4px solid #fff' : '4px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 4,
            }}
            onMouseEnter={(e) => {
              if (active !== item.id) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.paddingLeft = '20px';
              }
            }}
            onMouseLeave={(e) => {
              if (active !== item.id) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.paddingLeft = '16px';
              }
            }}
          >
            <span style={{fontSize: 18}}>{menuIcons[item.id]}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {user && (
        <div style={{
          borderTop: '2px solid rgba(255,255,255,0.2)',
          padding: 16,
          background: 'rgba(0,0,0,0.1)',
        }}>
          <div style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            fontWeight: 700,
            marginBottom: 6,
          }}>
            Logged in as
          </div>
          <div style={{
            fontSize: 15,
            fontWeight: 700,
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{fontSize: 18}}>👤</span>
            {user.name}
          </div>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              padding: 10,
              background: 'linear-gradient(135deg, #f5576c 0%, #f093fb 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.3s',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 87, 108, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🚪 Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

