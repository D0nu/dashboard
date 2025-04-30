// app/notifications/page.tsx
'use client';

export default function NotificationsPage() {
  return (
    <div className="bg-sub-1 rounded-3xl p-6">
      <h1 className="text-2xl text-white mb-6">Notifications</h1>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="p-4 bg-dark-base rounded-lg">
            <p className="text-sub-2">New stake reward available for epoch #{item}</p>
            <p className="text-xs text-sub-2 mt-2">2 hours ago</p>
          </div>
        ))}
      </div>
    </div>
  );
}