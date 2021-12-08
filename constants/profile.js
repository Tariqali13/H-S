export const tabsArray = isAdmin => {
  if (isAdmin) {
    return [
      {
        id: "1",
        name: "Basic Info",
      },
      {
        id: "2",
        name: "Update Password",
      },
      {
        id: "3",
        name: "About",
      },
    ];
  } else {
    return [
      {
        id: "1",
        name: "Basic Info",
      },
      {
        id: "2",
        name: "Update Password",
      },
    ];
  }
};