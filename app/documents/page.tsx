// app/documents/page.tsx
'use client';

export default function DocumentsPage() {
  return (
    <div className="bg-sub-1 rounded-3xl p-6">
      <h1 className="text-2xl text-white mb-6">Documentation</h1>
      <div className="space-y-4">
        {['Staking Guide', 'API Reference', 'Security Audit'].map((doc, index) => (
          <div key={index} className="p-4 bg-dark-base rounded-lg hover:bg-sub-2/10 transition-colors">
            <p className="text-white">{doc}</p>
            <p className="text-xs text-sub-2 mt-2">PDF • Updated 1 week ago</p>
          </div>
        ))}
      </div>
    </div>
  );
}