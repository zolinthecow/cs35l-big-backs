import { Auth0ManagementApiToken } from '@prisma/client';
import IAuth0ManagementService from './Auth0Management.interface';

import prisma from '@/prisma';
import { DateTime } from 'luxon';
import { ManagementClient } from 'auth0';
import axios from 'axios';

const DB_AUTH0_TOKEN_ID = 'AUTH0_MANAGEMENT_TOKEN';

class _Auth0ManagementService implements IAuth0ManagementService {
  private _accessToken: { accessToken: string; expiresAt: Date } | null;

  constructor() {
    this._accessToken = null;
  }

  private checkIfTokenIsExpired(expiresAt: Date): boolean {
    return DateTime.now() > DateTime.fromJSDate(expiresAt);
  }

  private async fetchTokenFromDatabase(): Promise<boolean> {
    let tokenResp = await prisma.auth0ManagementApiToken.findUnique({
      where: {
        id: DB_AUTH0_TOKEN_ID,
      },
    });
    if (tokenResp == null) {
      console.log('NOTHING IN DATABASE');
      return false;
    }
    console.log(tokenResp);

    if (this.checkIfTokenIsExpired(tokenResp.expiresAt)) {
      console.log('IN DATABASE BUT EXPIRED');
      await this.fetchTokenFromAuth0();
    } else {
      console.log('SETTING ACCESS TOKEN');
      this._accessToken = {
        accessToken: tokenResp.token,
        expiresAt: tokenResp.expiresAt,
      };
    }
    return true;
  }

  public async fetchTokenFromAuth0(): Promise<boolean> {
    const postBody = {
      grant_type: 'client_credentials',
      client_id: process.env['AUTH0_MANAGEMENT_CLIENT_ID'] ?? '',
      client_secret: process.env['AUTH0_MANAGEMENT_CLIENT_SECRET'] ?? '',
      audience: `${process.env['AUTH0_ISSUER_BASE_URL']}/api/v2/`,
    };
    const postOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    console.log('QUERYING AUTH0');
    console.log(
      `${process.env['AUTH0_ISSUER_BASE_URL']}/oauth/token`,
      postBody,
      postOptions,
    );
    const resp = await axios.post(
      `${process.env['AUTH0_ISSUER_BASE_URL']}/oauth/token`,
      postBody,
      postOptions,
    );
    console.log(resp);
    const data = await resp.data;
    console.log('GOT ACCESS TOKEN');
    console.log(data);
    const accessToken = data.access_token as string;
    const expiresIn = data.expires_in as number;
    const expiresAt = DateTime.now()
      .plus({ seconds: expiresIn - 300 })
      .toJSDate();

    console.log(accessToken, expiresIn, expiresAt);

    await prisma.auth0ManagementApiToken.upsert({
      where: {
        id: DB_AUTH0_TOKEN_ID,
      },
      create: {
        id: DB_AUTH0_TOKEN_ID,
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

    return true;
  }

  public async getAccessToken(refetch?: boolean): Promise<string> {
    console.log('GETTING ACCESS TOKEN');
    console.log(
      this._accessToken &&
        this.checkIfTokenIsExpired(this._accessToken.expiresAt),
    );
    if (
      refetch ||
      (this._accessToken &&
        this.checkIfTokenIsExpired(this._accessToken.expiresAt))
    ) {
      console.log('GETTING NEW ACCESS TOKEN');
      await this.fetchTokenFromAuth0();
    }

    if (!this._accessToken) {
      if (!(await this.fetchTokenFromDatabase())) {
        await this.fetchTokenFromAuth0();
      }
    }

    if (!this._accessToken) {
      throw new Error('COULD NOT GET ACCESS TOKEN BAD BAD');
    }

    return this._accessToken.accessToken;
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
