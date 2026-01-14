'use client';

interface ActivityItemProps {
  user: string;
  action: string;
  time: string;
}

const ActivityItem = ({ user, action, time }: ActivityItemProps) => (
  <div className="flex pb-4 border-b border-gray-100 last:border-0 last:pb-0">
    <div className="mr-4">
      <div className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="text-indigo-600 font-medium">{user.charAt(0)}</span>
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 truncate">{user} {action}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

const ActivityFeed = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        <ActivityItem user="John Doe" action="completed the project proposal" time="2 hours ago" />
        <ActivityItem user="Jane Smith" action="created a new task" time="4 hours ago" />
        <ActivityItem user="Alex Johnson" action="updated the design document" time="5 hours ago" />
        <ActivityItem user="Sarah Williams" action="commented on your task" time="Yesterday" />
      </div>
    </div>
  );
};

export default ActivityFeed;