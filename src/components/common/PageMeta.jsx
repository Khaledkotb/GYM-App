import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeMeta = {
  "/": {
    title: "GymSys | Dashboard",
    description: "Manage gym members, subscriptions, and memberships from one modern dashboard.",
  },
  "/members": {
    title: "GymSys | Members",
    description: "View and manage gym members, contact details, and subscription status.",
  },
  "/login": {
    title: "GymSys | Login",
    description: "Sign in to access the GymSys management dashboard.",
  },
};

function PageMeta() {
  const location = useLocation();

  useEffect(() => {
    const meta = routeMeta[location.pathname] || {
      title: "GymSys | Page Not Found",
      description: "The requested page could not be found.",
    };

    document.title = meta.title;

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", meta.description);
  }, [location.pathname]);

  return null;
}

export default PageMeta;
