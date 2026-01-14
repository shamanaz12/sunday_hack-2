'use client';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const StatsCards = ({ title, value, icon, color }: StatsCardProps) => {
  return (
    <div className={`${color} rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center">
        <div className="rounded-lg bg-white bg-opacity-20 p-3">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-white opacity-90">{title}</p>
          <p className="text-2xl font-extrabold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;