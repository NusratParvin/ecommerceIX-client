import { Card, CardContent } from "@/components/ui/card";

interface UserStatsProps {
  total: number;
  active: number;
  suspended: number;
  admins: number;
  vendors: number;
  regularUsers: number;
}

const UserStats = ({ userStats }: { userStats: UserStatsProps }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      <Card className="h-14">
        <CardContent className="px-6 py-3">
          <div className="flex items-center justify-between ">
            <p className="text-sm font-semibold text-slate-600">Total Users</p>
            <p className="text-2xl font-bold text-slate-900">
              {userStats.total}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="h-14">
        <CardContent className="px-6 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-600">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {userStats.active}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="h-14">
        <CardContent className="px-6 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-600">Suspended</p>
            <p className="text-2xl font-bold text-orange-600">
              {userStats.suspended}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="h-14">
        <CardContent className="px-6 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-600">Admins</p>
            <p className="text-2xl font-bold text-red-600">
              {userStats.admins}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="h-14">
        <CardContent className="px-6 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-600">Vendors</p>
            <p className="text-2xl font-bold text-blue-600">
              {userStats.vendors}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="h-14">
        <CardContent className="px-6 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-600">Users</p>
            <p className="text-2xl font-bold text-green-600">
              {userStats.regularUsers}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
