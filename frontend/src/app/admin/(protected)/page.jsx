import { redirect } from "next/navigation";

export default function AdminIndex() {
  // Redirect to the blog admin panel we built
  redirect("/admin/blog/new");
}
