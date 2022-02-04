const routes = isAdmin =>{
  let customRoutes = [];
  if (isAdmin) {
    customRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        layout: "/admin",
      },
      {
        path: "/bookings",
        name: "Bookings",
        icon: "ni ni-book-bookmark text-orange",
        layout: "/admin",
      },
      {
        path: "/employees",
        name: "Employees",
        icon: "ni ni-single-copy-04 text-pink",
        layout: "/admin",
      },
      {
        path: "/training-videos",
        name: "H&S ACADEMY",
        icon: "ni ni-button-play text-yellow",
        layout: "/admin",
      },
      {
        path: "/consultation",
        name: "Consultation",
        icon: "ni ni-ui-04 text-pink",
        layout: "/admin",
      },
      {
        path: "/services",
        name: "Services",
        icon: "ni ni-collection text-yellow",
        layout: "/admin",
      },
      {
        path: "/recent-works",
        name: "Recent Works",
        icon: "ni ni-bag-17 text-yellow",
        layout: "/admin",
      },
      {
        path: "/testimonials",
        name: "Testimonials",
        icon: "ni ni-satisfied text-black",
        layout: "/admin",
      },
      {
        path: "/contacts",
        name: "Contacts",
        icon: "ni ni-collection text-info",
        layout: "/admin",
      },
    ];
  } else {
    customRoutes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        layout: "/admin",
      },
      {
        path: "/training-videos",
        name: "H&S ACADEMY",
        icon: "ni ni-image text-yellow",
        layout: "/admin",
      },
    ];
  }
  return customRoutes;
};

export default routes;
