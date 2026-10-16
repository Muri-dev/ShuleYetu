import {
  Bell,
  CheckCircle2,
  Clock,
  ClipboardCheck,
  Package,
  Calendar,
} from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: "notif-1",
      title: "Results Approval Required",
      message: "Ms. Sarah Jenkins submitted Form 3 West Pure Mathematics Mid-Term examination results for review.",
      time: "25 minutes ago",
      icon: ClipboardCheck,
      color: "text-amber-600 bg-amber-50",
    },
    {
      id: "notif-2",
      title: "Inventory Requisition Approved",
      message: "Requisition #req-002 for dry-erase whiteboard markers was approved by the Inventory Officer.",
      time: "2 hours ago",
      icon: Package,
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: "notif-3",
      title: "Mid-Term Consultation Conference",
      message: "Parent-Teacher consultative conference schedules have been published to all parent portals.",
      time: "Yesterday",
      icon: Calendar,
      color: "text-purple-600 bg-purple-50",
    },
    {
      id: "notif-4",
      title: "System Backup Completed",
      message: "Automated incremental PostgreSQL database snapshot completed successfully without errors.",
      time: "2 days ago",
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-surface-900">
            System Notifications
          </h1>
          <p className="text-surface-500 text-sm mt-0.5">
            Operational alerts, workflow status updates, and broadcast circulars.
          </p>
        </div>
        <span className="badge-primary text-xs">4 Unread Alerts</span>
      </div>

      <div className="bg-white border border-surface-200 rounded-3xl p-6 shadow-xs divide-y divide-surface-100">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-2xl ${item.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-semibold text-surface-900 text-sm">{item.title}</h3>
                  <span className="text-[11px] text-surface-400 font-mono">{item.time}</span>
                </div>
                <p className="text-xs text-surface-600 leading-relaxed">{item.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
