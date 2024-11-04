// Component to scroll to top on route change
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  // Path const to check for route changes
  const { pathname } = useLocation();

  // Scroll to top every time the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Return null because this component does not render anything
  return null;
};

export default ScrollToTop;
