import { Dashboard, AccountBox, Person, SentimentSatisfiedAlt, Block } from "@material-ui/icons";
export const SidebarData = [
  {
    title: "Dashboard",
    class: "slidebar-nav-item",
    url: "/dashboard",
    urlClass: "slidebar-nav-link",
    icon: Dashboard,
    iconClass: "slide-icon",
  },
  {
    title: "Personal",
    class: "slidebar-nav-item",
    url: "/dashboard/personal",
    urlClass: "slidebar-nav-link",
    icon: Person,
    iconClass: "slide-icon",
  },
  {
    title: "Pacientes",
    class: "slidebar-nav-item",
    url: "/dashboard/pacientes",
    urlClass: "slidebar-nav-link",
    icon: SentimentSatisfiedAlt,
    iconClass: "slide-icon",
  },
  {
    title: "Usuarios",
    class: "slidebar-nav-item",
    url: "/dashboard/usuarios",
    urlClass: "slidebar-nav-link",
    icon: AccountBox,
    iconClass: "slide-icon",
  },
  {
    title: "Test",
    class: "slidebar-nav-item",
    url: "/dashboard/test",
    urlClass: "slidebar-nav-link",
    icon: Block,
    iconClass: "slide-icon",
  },
];
