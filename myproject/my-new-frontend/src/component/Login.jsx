import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    // Simple validation - in production use real auth
    const user = { email, name: email.split('@')[0] };
    if (onLogin) onLogin(user);
  }

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div style={{width:320,padding:24,background:'#fff',borderRadius:8,boxShadow:'0 4px 12px rgba(0,0,0,0.15)'}}>
        <h1 style={{textAlign:'center',marginTop:0}}>Business</h1>
        <p style={{textAlign:'center',color:'#666',marginBottom:24}}>Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div style={{marginBottom:16}}>
            <label style={{display:'block',fontSize:12,fontWeight:600,marginBottom:4,color:'#333'}}>Email</label>
            <input
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{width:'100%',padding:8,border:'1px solid #ddd',borderRadius:4,fontSize:14,boxSizing:'border-box'}}
            />
          </div>

          <div style={{marginBottom:16}}>
            <label style={{display:'block',fontSize:12,fontWeight:600,marginBottom:4,color:'#333'}}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{width:'100%',padding:8,border:'1px solid #ddd',borderRadius:4,fontSize:14,boxSizing:'border-box'}}
            />
          </div>

          {error && (
            <div style={{background:'#fee',color:'#c33',padding:8,borderRadius:4,fontSize:12,marginBottom:16}}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{width:'100%',padding:10,background:'#667eea',color:'#fff',border:'none',borderRadius:4,fontSize:14,fontWeight:600,cursor:'pointer'}}
          >
            Sign In
          </button>
        </form>

        <p style={{textAlign:'center',fontSize:12,color:'#999',marginTop:16}}>
          Demo: Use any email and password (min 4 chars)
        </p>
      </div>
    </div>
  );
}
