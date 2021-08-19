import {
  Dashboard,
  AccountBox,
  Person,
  SentimentSatisfiedAlt,
  // Block,
  ShoppingCart,
  EventAvailable,
  Storefront,
  EmojiPeople,
  Today,
  Shop,
  // SettingsApplications,
  ListAlt,
  // ViewList,
  PeopleAlt,
  LocalShipping,
  AddShoppingCart,
} from "@material-ui/icons";
export const SidebarData = [
  {
    title: "Dashboard",
    class: "slidebar-nav-item",
    url: "/dashboard",
    urlClass: "slidebar-nav-link",
    icon: Dashboard,
    iconClass: "slide-icon",
    exact: true,
  },
  {
    title: "Ventas",
    class: "slidebar-nav-item",
    url: "/dashboard/ventas",
    urlClass: "slidebar-nav-link",
    icon: ShoppingCart,
    iconClass: "slide-icon",
    exact: false,
  },
  {
    title: "Personal",
    class: "slidebar-nav-item",
    url: "/dashboard/personal",
    urlClass: "slidebar-nav-link",
    icon: Person,
    iconClass: "slide-icon",
    exact: false,
  },
  {
    title: "Odontologos",
    class: "slidebar-nav-item",
    url: "/dashboard/odontologos",
    urlClass: "slidebar-nav-link",
    icon: PeopleAlt,
    iconClass: "slide-icon",
    exact: false,
  },
  {
    title: "Clientes",
    class: "slidebar-nav-item",
    url: "/dashboard/clientes",
    urlClass: "slidebar-nav-link",
    icon: EmojiPeople,
    iconClass: "slide-icon",
    exact: false,
  },
  {
    title: "Pacientes",
    class: "slidebar-nav-item",
    url: "/dashboard/pacientes",
    urlClass: "slidebar-nav-link",
    icon: SentimentSatisfiedAlt,
    iconClass: "slide-icon",
    exact: false,
  },

  {
    title: "Productos",
    class: "slidebar-nav-item",
    url: "/dashboard/productos",
    urlClass: "slidebar-nav-link",
    icon: Storefront,
    iconClass: "slide-icon",
    exact: false,
  },
  {
    title: "Proveedores",
    class: "slidebar-nav-item",
    url: "/dashboard/proveedores",
    urlClass: "slidebar-nav-link",
    icon: LocalShipping,
    iconClass: "slide-icon",
    exact: false,
  },
  {
    title: "Compras",
    class: "slidebar-nav-item",
    url: "/dashboard/compras",
    urlClass: "slidebar-nav-link",
    icon: AddShoppingCart,
    iconClass: "slide-icon",
    exact: false,
  },
  {
    title: "Servicios",
    class: "slidebar-nav-item",
    url: "/dashboard/servicios",
    urlClass: "slidebar-nav-link",
    icon: Shop,
    iconClass: "slide-icon",
  },
  {
    title: "Agenda",
    class: "slidebar-nav-item",
    url: "/dashboard/agenda",
    urlClass: "slidebar-nav-link",
    icon: EventAvailable,
    iconClass: "slide-icon",
    exact: false,
  },
  {
    title: "Citas",
    class: "slidebar-nav-item",
    url: "/dashboard/cita",
    urlClass: "slidebar-nav-link",
    icon: Today,
    iconClass: "slide-icon",
    exact: false,
  },
  // {
  //   title: "Calendario",
  //   class: "slidebar-nav-item",
  //   url: "/dashboard/calendario",
  //   urlClass: "slidebar-nav-link",
  //   icon: Today,
  //   iconClass: "slide-icon",
  // },
  {
    title: "Usuarios",
    class: "slidebar-nav-item",
    url: "/dashboard/usuarios",
    urlClass: "slidebar-nav-link",
    icon: AccountBox,
    iconClass: "slide-icon",
    exact: false,
  },
  {
    title: "Reportería",
    class: "slidebar-nav-item",
    url: "/dashboard/reporteria",
    urlClass: "slidebar-nav-link",
    icon: ListAlt,
    iconClass: "slide-icon",
    exact: false,
  },
  // {
  //   title: "Inventarios",
  //   class: "slidebar-nav-item",
  //   url: "/dashboard/inventario",
  //   urlClass: "slidebar-nav-link",
  //   icon: ViewList,
  //   iconClass: "slide-icon",
  //   exact: false,
  // },
  // {
  //   title: "Test",
  //   class: "slidebar-nav-item",
  //   url: "/dashboard/test",
  //   urlClass: "slidebar-nav-link",
  //   icon: Block,
  //   iconClass: "slide-icon",
  // },
];
