import { Secp256k1KeyIdentity } from '@dfinity/identity';
import fetch from 'isomorphic-fetch';
import { createNFTBarterActor } from '../../NFTBarter_assets/src/utils/createNftBarterActor';

const identityOptionOfAlice = {
  agentOptions: {
    identity: Secp256k1KeyIdentity.generate(),
    fetch,
    host: 'http://localhost:8000',
  },
};
const actorOfAlice = createNFTBarterActor(identityOptionOfAlice);

describe('User registration tests', () => {
  it('Alice is not registered yet.', async () => {
    expect(await actorOfAlice.isRegistered()).toBe(false);
  });

  it('Alice can be registered.', async () => {
    const res = await actorOfAlice.register();
    if ('ok' in res) {
      expect(res.ok._isPrincipal).toBe(true);
    } else {
      throw new Error(res.err);
    }
  });

  it('Alice is already registered.', async () => {
    expect(await actorOfAlice.isRegistered()).toBe(true);
  });
});
