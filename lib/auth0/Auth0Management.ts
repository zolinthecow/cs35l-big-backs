import { Auth0ManagementApiToken } from '@prisma/client';
import IAuth0ManagementService from './Auth0Management.interface';

import prisma from '~/prisma';
import { DateTime } from 'luxon';
import { ManagementClient } from 'auth0';

class _Auth0ManagementService implements IAuth0ManagementService {
  private _accessToken: { accessToken: string; expiresAt: Date } | null;

  constructor() {
    this._accessToken = null;
  }

  private async fetchTokenFromDatabase(): Promise<Auth0ManagementApiToken | null> {
    const tokenResp = await prisma.auth0ManagementApiToken.findUnique({
      where: {
        id: 'AUTH0_MANAGEMENT_TOKEN',
      },
    });
    if (tokenResp == null) return null;
    return tokenResp;
  }

  private async fetchTokenFromAuth0(): Promise<string> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: process.env['AUTH0_MANAGEMENT_CLIENT_ID'] ?? '',
        client_secret: process.env['AUTH0_MANAGEMENT_CLIENT_SECRET'] ?? '',
        audience: `${process.env['AUTH0_ISSUER_BASE_URL']}/api/v2/`,
      }),
    };

    const resp = await fetch(
      `${process.env['AUTH0_ISSUER_BASE_URL']}/oauth/token`,
      options,
    );
    const data = await resp.json();
    const accessToken = data.access_token as string;
    const expiresIn = data.expires_in as number;
    const expiresAt = DateTime.now()
      .plus({ seconds: expiresIn - 300 })
      .toJSDate();

    await prisma.auth0ManagementApiToken.upsert({
      where: {
        id: 'AUTH0_MANAGEMENT_TOKEN',
      },
      create: {
        id: 'AUTH0_MANAGEMENT_TOKEN',
        token: accessToken,
        expiresAt,
      },
      update: {
        token: accessToken,
        expiresAt,
      },
    });
    this._accessToken = {
      accessToken,
      expiresAt,
    };

    return accessToken;
  }

  public async getAccessToken(refetch?: boolean): Promise<string> {
    if (
      refetch ||
      (this._accessToken &&
        DateTime.now() > DateTime.fromJSDate(this._accessToken.expiresAt))
    ) {
      return await this.fetchTokenFromAuth0();
    }

    if (this._accessToken) {
      return this._accessToken.accessToken;
    } else {
      let token = (await this.fetchTokenFromDatabase())?.token;
      if (!token) {
        token = await this.fetchTokenFromAuth0();
      }
      return token;
    }
  }
}

const Auth0ManagementServiceSingleton = () => {
  return new _Auth0ManagementService();
};

declare global {
  var Auth0ManagementServiceGlobal:
    | undefined
    | ReturnType<typeof Auth0ManagementServiceSingleton>;
}

const Auth0ManagementService =
  globalThis.Auth0ManagementServiceGlobal ?? Auth0ManagementServiceSingleton();

export default Auth0ManagementService;

if (process.env.NODE_ENV !== 'production')
  globalThis.Auth0ManagementServiceGlobal = Auth0ManagementService;
