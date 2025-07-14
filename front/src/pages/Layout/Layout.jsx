import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <header style={{ background: '#333', color: '#fff', padding: '1rem' }}>
        <h1>상단 Header</h1>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{ width: '200px', background: '#eee', padding: '1rem' }}>
          <p>사이드바 메뉴</p>
          <p>메뉴1</p>
          <p>메뉴2</p>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '1rem' }}>
          <Outlet />  {/* 여기에 페이지가 렌더링됨 */}
        </main>
      </div>
    </div>
  );
};

export default Layout;