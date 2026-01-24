import moment from "moment";

// User data processing functions for  chart
export const processUserRoleData = (users: any[]) => {
  if (!users || !Array.isArray(users)) {
    return { labels: [], values: [] };
  }

  const roleCount: { [key: string]: number } = {};

  users.forEach((user) => {
    if (user?.role) {
      const role = user.role;
      roleCount[role] = (roleCount[role] || 0) + 1;
    }
  });

  return {
    labels: Object.keys(roleCount),
    values: Object.values(roleCount),
  };
};

export const processUserStatusData = (users: any[]) => {
  if (!users || !Array.isArray(users)) {
    return { labels: [], values: [] };
  }

  const statusCount: { [key: string]: number } = {};

  users.forEach((user) => {
    if (user?.status) {
      const status = user.status;
      statusCount[status] = (statusCount[status] || 0) + 1;
    }
  });

  return {
    labels: Object.keys(statusCount),
    values: Object.values(statusCount),
  };
};

export const processUserRegistrationData = (users: any[]) => {
  if (!users || !Array.isArray(users)) {
    return { labels: [], values: [] };
  }

  const monthlyRegistrations: { [key: string]: number } = {};

  users.forEach((user) => {
    if (user?.createdAt) {
      const month = new Date(user.createdAt).toLocaleString("default", {
        month: "short",
      });
      monthlyRegistrations[month] = (monthlyRegistrations[month] || 0) + 1;
    }
  });

  // Sort months chronologically
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const sortedLabels = months.filter((month) => monthlyRegistrations[month]);
  const sortedValues = sortedLabels.map((month) => monthlyRegistrations[month]);

  return {
    labels: sortedLabels,
    values: sortedValues,
  };
};
