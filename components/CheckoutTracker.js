import { useRouter } from "next/router";
import Link from "next/link";

export default function CheckoutTracker({ children, href }) {
  const router = useRouter();
  const style = {
    color: router.pathname === href ? "blue" : "#333",
    width: "100%",
    height: "100%",
  };

  return (
    <li>
      <Link href={href}>
        <a style={style}>{children}</a>
      </Link>
    </li>
  );
}
