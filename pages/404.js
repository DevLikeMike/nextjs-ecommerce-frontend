import Link from "next/link";
import Layout from "@/components/Layout";
import { FaExclamationTriangle } from "react-icons/fa";

export default function Error() {
  return (
    <Layout title='Coffee Cabinet | 404'>
      <main className='error flex flex-center col'>
        <h1>
          <FaExclamationTriangle /> 404
        </h1>
        <h2 className='text-center'>Sorry, there is nothing here</h2>
        <Link href='/'>
          <a className='link-blue'>Go Back Home?</a>
        </Link>
      </main>
    </Layout>
  );
}
