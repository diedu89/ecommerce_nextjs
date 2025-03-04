"use client";

import { Suspense } from "react";
import { MeQuery } from "../../lib/gql/graphql";
import { meQuery } from "../../lib/queries/meQuery";
import { useSuspenseQuery } from "@apollo/client";

function PreloadedAccountData() {
  return (
    <Suspense fallback={<div>Loading account data...</div>}>
      <AccountDetails />
    </Suspense>
  );
}

function AccountDetails() {
  const { data: { me } = {} } = useSuspenseQuery<MeQuery>(meQuery);

  if (!me) {
    return <div>No account data found</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <div className="mt-1 text-gray-900">{me.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <div className="mt-1 text-gray-900">{me.username}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              First Name
            </label>
            <div className="mt-1 text-gray-900">{me.firstName}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Last Name
            </label>
            <div className="mt-1 text-gray-900">{me.lastName}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Member Since
            </label>
            <div className="mt-1 text-gray-900">
              {new Date(me.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Account() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <PreloadedAccountData />
      </div>
    </div>
  );
}
