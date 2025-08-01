'use client';

import { PagesRoutes } from '@/Routes';
import { Button } from '@intlayer/design-system';
import { useUser } from '@intlayer/design-system/hooks';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

export const ProfilePanel: FC = () => {
  const { isUnauthenticated, user, logout } = useUser();
  const router = useRouter();

  const handleLogOut = () => {
    logout()
      .then(() => router.refresh())
      .catch((err) => console.error(err));
  };

  if (isUnauthenticated) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-5">
      {user?.name && (
        <span className="whitespace-nowrap text-lg font-bold">{user.name}</span>
      )}
      {user?.email && (
        <span className="whitespace-nowrap text-base">{user.email}</span>
      )}
      <Button
        variant="link"
        color="text"
        onClick={() => router.push(PagesRoutes.Auth_ChangePassword)}
        label="Replace your password with a new one."
      >
        Change password
      </Button>
      <Button
        variant="outline"
        color="text"
        onClick={handleLogOut}
        label="Logout from app"
      >
        Logout
      </Button>
    </div>
  );
};
