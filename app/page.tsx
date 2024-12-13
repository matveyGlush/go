"use client"

import CunstomButton from '@/components/CustomButton';
import CustomLayout from '@/components/CustomLayout';
import Head from 'next/head';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <Head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </Head>
      <CustomLayout>
        <div className="py-8 text-center bg-gray-100 rounded-lg mb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 px-6">
            <div className="mb-3 px-3">
              <h1 className="text-4xl font-bold mb-4">Most important title on the page</h1>
              <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mattis, leo et condimentum ultricies.</p>
            </div>
            <div className="rounded-lg overflow-hidden">
            </div>
          </div>
        </div>

        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold mb-5">Also very important title</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="p-4 text-center flex flex-col items-center bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Title</h3>
                <p className="max-w-xs text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            ))}
          </div>
          <Link tabIndex={-1} href={"contact-us"}>
            <div className="bg-primary text-white rounded-lg px-6 py-2 mt-5 hover:bg-primary-dark">Contact us</div>
          </Link>
        </div>

        <div className="bg-gray-100 py-16 rounded-lg text-center">
          <h3 className="text-2xl font-bold">Less important title</h3>
          <Link tabIndex={-1} href={"contact-us"}>
            <div className="bg-primary text-white rounded-lg px-6 py-2 mt-2 hover:bg-primary-dark">Contact us</div>
          </Link>
        </div>
      </CustomLayout>
    </>
  );
}
